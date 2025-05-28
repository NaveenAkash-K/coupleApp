const mongoose = require("mongoose")
const {Schema} = require("mongoose");
const schema = mongoose.Schema;

const InvitationSchema = new schema(
    {
        _id: {type: String, required: true},
        from: {type: String, ref: "User", required: true},
        to: {type: String, ref: "User", required: true},
        isActive: {type: Boolean, required: true, default: false},
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            required: true,
            default: "pending"
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Invitation", InvitationSchema);