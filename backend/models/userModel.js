const mongoose = require("mongoose")
const schema = mongoose.Schema;

const UserSchema = new schema(
    {
        _id: {type: String, required: true},
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        inviteId: {type: String, required: true},
        isLinked: {type: Boolean, required: true, default: false},
        coupleId: {type: String, ref: "Couple"},
        otpSecret: {type: String},
        verified: {type: Boolean, required: true, default: false}
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema);