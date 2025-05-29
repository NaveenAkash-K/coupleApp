const express = require("express")
const router = express.Router()
const {v4: uuidv4} = require("uuid");
const {bucket} = require("../firebase");
const Memory = require("../models/memoryModal")
const User = require("../models/userModel")
const Couple = require("../models/coupleModel")
const groupByMonth = require("../utils/groupByMonth")

router.post("/add", async (req, res) => {
    try {
        const {title, description, date, image} = req.body;
        const memoryId = uuidv4();

        const user = await User.findById(req.context.userId);

        const memory = new Memory({
            _id: memoryId,
            title,
            description,
            date,
            userId: req.context.userId,
            coupleId: user.coupleId
        });

        if (image) {
            const buffer = Buffer.from(image, "base64");
            const filename = `${req.context.userId}/memories/${memoryId}.jpg`;
            const file = bucket.file(filename);

            await file.save(buffer, {
                metadata: {contentType: "image/jpeg"},
                resumable: false,
            });

            memory.imageName = memoryId;
        }

        await memory.save();

        res.status(200).json({message: "Memory saved!"});

        const couple = await Couple.findById(user.coupleId);
        // 🔁 Increment memory counts
        const update = {
            $inc: {
                totalMemories: 1,
                ...(req.context.userId === couple.userA
                    ? {userAMemories: 1}
                    : {userBMemories: 1})
            }
        };

        await Couple.findByIdAndUpdate(user.coupleId, update);

    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({error: "Something went wrong"});
    }
});

router.patch("/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const {title, description, image, date, deleteImage} = req.body;
        const userId = req.context.userId;

        // Find the memory
        const memory = await Memory.findById(_id);
        if (!memory) {
            return res.status(404).json({message: "Memory not found"});
        }

        // Update fields
        memory.title = title;
        memory.description = description;
        memory.date = date;

        const filename = `${userId}/memories/${_id}.jpg`;

        // Delete image if requested
        if (deleteImage === true) {
            try {
                await bucket.file(filename).delete({ignoreNotFound: true});
                memory.imageName = undefined;
            } catch (err) {
                console.warn("Image delete error:", err.message);
            }
        }

        // Upload new image if provided
        if (typeof image === "string" && image.trim() !== "") {
            try {
                const buffer = Buffer.from(image, "base64");
                const file = bucket.file(filename);

                await file.save(buffer, {
                    metadata: {contentType: "image/jpeg"},
                    resumable: false,
                });

                memory.imageName = _id;
            } catch (err) {
                console.error("Image upload error:", err);
                return res.status(500).json({message: "Failed to upload image"});
            }
        }

        const updatedMemory = await memory.save();
        res.status(200).json({updatedMemory});
    } catch (error) {
        console.error("Error updating memory:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.delete("/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const userId = req.context.userId; // assuming middleware sets this

        // Find the memory
        const memory = await Memory.findById(_id);
        if (!memory) {
            return res.status(404).json({message: "Memory not found"});
        }
        await Memory.findByIdAndDelete(_id);
        res.status(200).json({message: "Memory deleted successfully"});

        // Delete image from storage if exists
        if (memory.imageName) {
            const filename = `${userId}/memories/${_id}.jpg`;
            try {
                await bucket.file(filename).delete({ignoreNotFound: true});
            } catch (err) {
                console.warn("Error deleting image:", err.message);
            }
        }

        // Delete the memory from DB
        const user = await User.findById(req.context.userId);
        const couple = await Couple.findById(user.coupleId);

        const update = {
            $inc: {
                totalMemories: -1,
                ...(req.context.userId === couple.userA
                    ? {userAMemories: -1}
                    : {userBMemories: -1})
            }
        };

        await Couple.findByIdAndUpdate(user.coupleId, update);


    } catch (error) {
        console.error("Error deleting memory:", error);
        res.status(500).json({message: "Internal server error"});
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