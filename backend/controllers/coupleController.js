const router = require("express").Router()
const Couple = require("../models/coupleModel")

router.get("/details", async (req, res) => {
    try {
        const userId = req.context.userId;
        const couple = await Couple.findOne({$or: [{userA: userId}, {userB: userId}]}).populate("userA userB", "username email _id")
        res.json({couple})
    } catch (e) {
        res.status(500).json({message: "Failed to fetch couple", details: e.message});
    }
})

module.exports = router