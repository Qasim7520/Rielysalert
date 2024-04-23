const mongoose = require("mongoose");
const { string } = require("yup");
const schema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required.'],
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        expireAt: {
            type: Date,
        },
        otp: {
            type: Number,
            required: [true, 'OTP is required.']
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    }
)

const schemaModal = mongoose.model('reset-password', schema);

module.exports = schemaModal;
