const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Invitation = require("../models/invitationModel");
const Couple = require("../models/coupleModel");
const {v4: uuidv4} = require("uuid");

// GET: Get all invitations for a user (sent or received)
router.get("/sent", async (req, res) => {
    try {
        const userId = req.context.userId;
        const invitation = await Invitation.findOne({
            isActive: true,
            from: userId
        }).populate("to", "username email _id");

        res.status(200).json({invitation});
    } catch (err) {
        res.status(500).json({error: "Failed to fetch invitations", details: err.message});
    }
});

router.get("/received", async (req, res) => {
    try {
        const userId = req.context.userId;
        const invitation = await Invitation.findOne({
            to: userId,
            isActive: true
        }).populate("from", "username email _id");

        res.status(200).json({invitation});
    } catch (err) {
        res.status(500).json({error: "Failed to fetch invitations", details: err.message});
    }
});

router.get("/checkStatus", async (req, res) => {
    try {
        const userId = req.context.userId;
        const couple = await Couple.findOne({$or: [{userA: userId}, {userB: userId}]}).populate("userA userB", "username email _id")

        res.status(200).json({couple});
    } catch (err) {
        res.status(500).json({error: "Failed to fetch couple", details: err.message});
    }
})

// POST: Send invitation
router.post("/send", async (req, res) => {
    try {
        const {inviteId} = req.body;

        // Check if invitation already exists
        const user = await User.findOne({inviteId: inviteId})
        if (!user) {
            return res.status(400).json({message: "Invalid invite Id"});
        }

        if (user._id === req.context.userId) {
            return res.status(400).json({message: "Invalid invite Id"});
        }

        const existing = await Invitation.findOne({$or: [{from: req.context.userId}, {to: req.context.userId}, {from: user._id}, {to: user._id}]});
        if (existing) {
            return res.status(400).json({message: "User currently not accepting invites"});
        }

        const invitation = new Invitation({
            _id: uuidv4(),
            from: req.context.userId,
            to: user._id,
            status: "pending",
            isActive: true,
        });

        await invitation.save();

        res.status(201).json({
            message: "Invitation sent successfully",
            invitation: {
                ...invitation._doc,
                to: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            },
        });
    } catch (err) {
        res.status(500).json({error: "Failed to send invitation", details: err.message});
    }
});

// POST: Accept invitation
router.post("/accept", async (req, res) => {
    try {
        const {invitationId} = req.body;

        const invitation = await Invitation.findById(invitationId);
        if (!invitation || invitation.status !== "pending") {
            return res.status(400).json({message: "Invalid invitation"});
        }

        if (invitation.to !== req.context.userId) {
            return res.status(400).json({message: "Invalid invitation"});
        }

        invitation.status = "accepted";
        invitation.isActive = false;
        await invitation.save();

        const coupleId = uuidv4();

        // Create Couple
        const couple = new Couple({
            _id: coupleId,
            userA: invitation.from,
            userB: invitation.to
        });

        await couple.save();

        // Update Users' isLinked field (optional)
        await User.updateMany(
            {_id: {$in: [invitation.from, invitation.to]}},
            {$set: {isLinked: true, coupleId}}
        );

        res.status(200).json({message: "Invitation accepted", couple});
    } catch (err) {
        res.status(500).json({error: "Failed to accept invitation", details: err.message});
    }
});

router.delete("/cancel/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        await Invitation.findByIdAndDelete(_id);
        res.status(200).json({message: "Invitation cancelled successfully"})
    } catch (err) {
        res.status(500).json({error: "Failed to cancel invitation", details: err.message});
    }
})

// POST: Reject invitation
router.post("/reject", async (req, res) => {
    try {
        const {invitationId} = req.body;

        const invitation = await Invitation.findById(invitationId);
        if (!invitation || invitation.status !== "pending") {
            return res.status(400).json({message: "Invalid invitation"});
        }


        if (invitation.to !== req.context.userId) {
            return res.status(400).json({message: "Invalid invitation"});
        }

        invitation.status = "rejected";
        invitation.isActive = false;
        await invitation.save();

        res.status(200).json({message: "Invitation rejected"});
    } catch (err) {
        res.status(500).json({error: "Failed to reject invitation", details: err.message});
    }
});

module.exports = router;
