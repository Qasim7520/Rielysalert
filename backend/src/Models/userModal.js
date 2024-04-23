const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const schema = mongoose.Schema(
    {
        image: {
            type: String,
            default: null
        },
        first_name: {
            type: String,
            required: [true, 'Firstname is required.']
        },
        last_name: {
            type: String,
            required: [true, 'Lastname is required.']
        },
        phone: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'password is required.'],
        },
        confirm_password: {
            type: String,
            required: [true, 'confirm password is required.']
        },
        contactCount: {
            type: Number,
            default: 0
        },
        videosCount: {
            type: Number,
            default: 0
        },
        fcm_token: {
            type: [String], 
            default: [] 
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                default: [0, 0],
            },
        },
        otp: {
            type: String,
            default: ''
        },
        token: {
            type: String,
            default: ''
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        otpTime: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true,
    }
)

schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.confirm_password = await bcrypt.hash(this.confirm_password, salt);
    }
    next()
})

const schemaModal = mongoose.model('user', schema);

module.exports = schemaModal;
