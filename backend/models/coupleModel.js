const mongoose = require("mongoose")
const {Schema} = require("mongoose");
const schema = mongoose.Schema;

const CoupleSchema = new schema(
    {
        _id: {type: String, required: true},
        partnerOne: {type: String, ref: "User", required: true},
        partnerTwo: {type: String, ref: "User", required: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model("Couple", CoupleSchema);