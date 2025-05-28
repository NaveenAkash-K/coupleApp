const mongoose = require("mongoose")

const schema = mongoose.Schema;

const memorySchema = new schema(
    {
        _id: {type: String, required: true},
        title: {type: String, required: true},
        description: {type: String},
        imageName: {type: String},
        date: {type: Date, required: true},
        userId: {type: String, ref: "User", required: true},
        coupleId: {type: String, ref: "Couple", required: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model("Memory", memorySchema);