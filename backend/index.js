const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const app = express();
const authController = require("./controllers/authController")
const invitationController = require("./controllers/invitationController")
const memoryTimelineController = require("./controllers/memoryTimelineController")
const checkAuth = require("./middleware/checkAuth")
app.use(helmet());
app.use(cors());
app.use(express.json({limit:"10mb"}))

const PORT = process.env.PORT || 5000;

app.use("/auth", authController)
app.use("/invitation", checkAuth, invitationController)
app.use("/memoryTimeline", checkAuth, memoryTimelineController)

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });