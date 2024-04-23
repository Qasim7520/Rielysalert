const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verifyEmailSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: "businessProfile",
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("verifyEmail", verifyEmailSchema);