const express = require("express")
const router = express.Router()
const {v4: uuidv4} = require("uuid");
const {bucket} = require("../firebase");
const Memory = require("../models/memoryModal")
const User = require("../models/userModel")
const Couple = require("../models/coupleModel")
const groupByMonth = require("../utils/groupByMonth")
const moment = require("moment");

router.post("/add", async (req, res) => {
    try {
        const { title, description, date, image } = req.body;
        const memoryId = uuidv4();
        const memoryDate = moment(date).toDate();
        const userId = req.context.userId;

        const user = await User.findById(userId);
        const couple = await Couple.findById(user.coupleId);

        const memory = new Memory({
            _id: memoryId,
            title,
            description,
            date: memoryDate,
            userId,
            coupleId: user.coupleId
        });

        if (image) {
            const buffer = Buffer.from(image, "base64");
            const filename = `${userId}/memories/${memoryId}.jpg`;
            const file = bucket.file(filename);

            await file.save(buffer, {
                metadata: { contentType: "image/jpeg" },
                resumable: false,
            });

            memory.imageName = memoryId;
        }

        await memory.save();

        // Prepare update object
        const update = {
            $inc: {
                totalMemories: 1,
                ...(userId === couple.userA
                    ? { userAMemories: 1 }
                    : { userBMemories: 1 }),
            },
            $set: {}
        };

        // Update per-user memory dates
        if (userId === couple.userA) {
            if (!couple.userAFirstMemoryDate || memoryDate < couple.userAFirstMemoryDate) {
                update.$set.userAFirstMemoryDate = memoryDate;
            }
            if (!couple.userALastMemoryDate || memoryDate > couple.userALastMemoryDate) {
                update.$set.userALastMemoryDate = memoryDate;
            }
        } else {
            if (!couple.userBFirstMemoryDate || memoryDate < couple.userBFirstMemoryDate) {
                update.$set.userBFirstMemoryDate = memoryDate;
            }
            if (!couple.userBLastMemoryDate || memoryDate > couple.userBLastMemoryDate) {
                update.$set.userBLastMemoryDate = memoryDate;
            }
        }

        // Remove $set if empty
        if (Object.keys(update.$set).length === 0) {
            delete update.$set;
        }

        await Couple.findByIdAndUpdate(user.coupleId, update);

        res.status(200).json({ message: "Memory saved!" });

    } catch (error) {
        console.error("Error uploading memory:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.patch("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const { title, description, image, date, deleteImage } = req.body;
        const userId = req.context.userId;

        const memory = await Memory.findById(_id);
        if (!memory) {
            return res.status(404).json({ message: "Memory not found" });
        }

        const oldDate = memory.date;
        const newDate = moment(date).toDate();
        const couple = await Couple.findById(memory.coupleId);

        if (!couple) {
            return res.status(404).json({ message: "Couple not found" });
        }

        const isUserA = userId === couple.userA;
        const userPrefix = isUserA ? "userA" : "userB";

        // Update memory fields
        memory.title = title;
        memory.description = description;
        memory.date = newDate;

        const filename = `${userId}/memories/${_id}.jpg`;

        // Handle delete image
        if (deleteImage === true) {
            try {
                await bucket.file(filename).delete({ ignoreNotFound: true });
                memory.imageName = undefined;
            } catch (err) {
                console.warn("Image delete error:", err.message);
            }
        }

        // Handle new image
        if (typeof image === "string" && image.trim() !== "") {
            try {
                const buffer = Buffer.from(image, "base64");
                const file = bucket.file(filename);
                await file.save(buffer, {
                    metadata: { contentType: "image/jpeg" },
                    resumable: false,
                });
                memory.imageName = _id;
            } catch (err) {
                console.error("Image upload error:", err);
                return res.status(500).json({ message: "Failed to upload image" });
            }
        }

        const updatedMemory = await memory.save();

        // Recalculate per-user first/last dates if date changed
        if (oldDate.getTime() !== newDate.getTime()) {
            const userMemories = await Memory.find({
                coupleId: memory.coupleId,
                userId: userId,
            }).sort({ date: 1 });

            const dateUpdate = {};
            if (userMemories.length > 0) {
                dateUpdate[`${userPrefix}FirstMemoryDate`] = userMemories[0].date;
                dateUpdate[`${userPrefix}LastMemoryDate`] = userMemories[userMemories.length - 1].date;
            } else {
                dateUpdate[`${userPrefix}FirstMemoryDate`] = null;
                dateUpdate[`${userPrefix}LastMemoryDate`] = null;
            }

            await Couple.findByIdAndUpdate(memory.coupleId, {
                $set: dateUpdate,
            });
        }

        res.status(200).json({ updatedMemory });
    } catch (error) {
        console.error("Error updating memory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const userId = req.context.userId;

        const memory = await Memory.findById(_id);
        if (!memory) {
            return res.status(404).json({ message: "Memory not found" });
        }

        const couple = await Couple.findById(memory.coupleId);
        if (!couple) {
            return res.status(404).json({ message: "Couple not found" });
        }

        const isUserA = userId === couple.userA;
        const userPrefix = isUserA ? "userA" : "userB";

        // Delete image if exists
        if (memory.imageName) {
            const filename = `${userId}/memories/${_id}.jpg`;
            try {
                await bucket.file(filename).delete({ ignoreNotFound: true });
            } catch (err) {
                console.warn("Error deleting image:", err.message);
            }
        }

        // Delete the memory
        await Memory.findByIdAndDelete(_id);

        // Decrement memory count
        await Couple.findByIdAndUpdate(memory.coupleId, {
            $inc: {
                totalMemories: -1,
                [`${userPrefix}Memories`]: -1,
            },
        });

        // Get all remaining memories for the user
        const userMemories = await Memory.find({
            coupleId: memory.coupleId,
            userId: userId,
        }).sort({ date: 1 });

        const dateUpdate = {};
        if (userMemories.length === 0) {
            dateUpdate[`${userPrefix}FirstMemoryDate`] = null;
            dateUpdate[`${userPrefix}LastMemoryDate`] = null;
        } else {
            dateUpdate[`${userPrefix}FirstMemoryDate`] = userMemories[0].date;
            dateUpdate[`${userPrefix}LastMemoryDate`] = userMemories[userMemories.length - 1].date;
        }

        await Couple.findByIdAndUpdate(memory.coupleId, {
            $set: dateUpdate,
        });

        res.status(200).json({ message: "Memory deleted successfully" });
    } catch (error) {
        console.error("Error deleting memory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/", async (req, res) => {
    const memories = await Memory.find({userId: req.context.userId});
    const groupedMemories = groupByMonth(memories.sort((a, b) => new Date(a.date) - new Date(b.date)))
    console.log("memories")
    console.log(memories)
    res.json({groupedMemories})
})


router.get("/image/:imageName", async (req, res) => {
    const imageName = req.params.imageName;

    try {
        const file = bucket.file(`${req.context.userId}/memories/${imageName}.jpg`);
        const [exists] = await file.exists();

        if (!exists) {
            return res.status(404).json({error: "Image not found"});
        }

        const buffer = await file.download();
        const base64 = buffer[0].toString("base64");

        res.status(200).json({
            image: base64,
        });
    } catch (err) {
        console.error("Error fetching image:", err);
        res.status(500).json({error: "Internal Server Error"});
    }

})
module.exports = router;