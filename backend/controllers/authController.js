const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy")
const {v4: uuidv4} = require("uuid");
const checkAuth = require("../middleware/checkAuth")

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});
        if (!user) return res.status(404).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({message: "Invalid credentials"});

        if (!user.verified) {
            const otpSecret = speakeasy.generateSecret({length: 20}).base32;
            const otp = speakeasy.totp({
                secret: otpSecret,
                encoding: "base32",
                digits: 4
            });
            user.otpSecret = otpSecret;
            console.log(`OTP for user ${email}: ${otp}`);
            await user.save();
            return res.status(300).json({message: "Email not verified", userId: user._id});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});


        res.status(200).json({message: "Login successful", token, user});
    } catch (err) {
        res.status(500).json({error: "Login failed", details: err.message});
    }
});

router.post("/signup", async (req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;

        if (password !== confirmPassword)
            return res.status(400).json({message: "Passwords do not match"});

        const existingUser = await User.findOne({email});
        if (existingUser)
            return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const otpSecret = speakeasy.generateSecret({length: 20}).base32;

        const userId = uuidv4(); // using UUID as _id
        const {nanoid} = await import('nanoid');
        const inviteId = nanoid(8).toUpperCase();

        const otp = speakeasy.totp({
            secret: otpSecret,
            encoding: "base32",
            digits: 4
        });
        console.log(`OTP for user ${email}: ${otp}`);

        const user = new User({
            _id: userId,
            username,
            email,
            password: hashedPassword,
            inviteId,
            otpSecret,
        });

        await user.save();

        // In production, send OTP via email or SMS

        res.status(201).json({message: "Signup successful. OTP sent to email.", userId});
    } catch (err) {
        res.status(500).json({error: "Signup failed", details: err.message});
    }
});

router.post("/verifyOtp", async (req, res) => {
    try {
        const {userId, otp} = req.body;

        console.log(userId)
        console.log(otp)

        const user = await User.findById(userId);
        if (!user || !user.otpSecret) return res.status(404).json({message: "User or OTP secret not found"});

        const verified = speakeasy.totp.verify({
            secret: user.otpSecret,
            encoding: "base32",
            token: otp,
            window: 1,
            digits: 4
        });

        if (!verified) return res.status(400).json({message: "Invalid OTP"});
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.status(200).json({message: "OTP verified successfully", token, user});
        user.otpSecret = null;
        user.verified = true;
        await user.save();
    } catch (err) {
        res.status(500).json({error: "OTP verification failed", details: err.message});
    }
});

router.get("/checkAuth", checkAuth, async (req, res) => {
    const user = await User.findById(req.context.userId);
    if (!user) return res.status(404).json({message: "User not found"});
    return res.json({user})
})

module.exports = router;