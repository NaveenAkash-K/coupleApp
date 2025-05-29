const mongoose = require("mongoose")
const {Schema} = require("mongoose");
const schema = mongoose.Schema;

const CoupleSchema = new schema(
    {
        _id: {type: String, required: true},
        userA: {type: String, ref: "User", required: true},
        userB: {type: String, ref: "User", required: true},
        anniversary: {type: Date}, // manually set if needed

        totalMemories: {type: Number, default: 0},
        userAMemories: {type: Number, default: 0},
        userBMemories: {type: Number, default: 0},

        userAFirstMemoryDate: {type: Date, default: null},
        userALastMemoryDate: {type: Date, default: null},
        userBFirstMemoryDate: {type: Date, default: null},
        userBLastMemoryDate: {type: Date, default: null},

        // placesVisited: { type: [String], default: [] },
        // commonTags: { type: [String], default: [] },
        // sharedPromises: { type: [String], default: [] },
        // recentPhotos: { type: [String], default: [] },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Couple", CoupleSchema);