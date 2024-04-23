const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const schema = mongoose.Schema(
    {

        pointOfContact: {
            type: String,
            required: [true, 'Point of Contact is required.']
        },
        name: {
            type: String,
            required: [true, 'Name is required.']
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
        },
        confirm_password: {
            type: String,
            required: [true, 'confirm password is required.']
        },
        phone: {
            type: String,
            default: ''
        },
        service: {
            type: String,
            default: ''
        },
        subService: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'free'
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
        distance:{
            type:String,
            default:''
        },
        zip_code: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        web_address: {
            type: String,
            default: ''
        },
        jwtoken: {
            type: String,
            default: ""
        },
        isverified: {
            type: Boolean,
            default: false
        },
        ratings: {
            type: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user',
                        required: true
                    },
                    rating: {
                        type: Number,
                        required: true,
                        min: 1,
                        max: 5
                    }
                }
            ],
            default: []
        },
        ratingsCount: {
            type: Number,
            default: 0
        },
        totalRating: {
            type: Number,
            default: 0
        },
        averageRating:{
            type:Number,
            default:0
        }
    },
    {
        timestamps: true,
    }
)
schema.path('pointOfContact').required(false);
schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.confirm_password = await bcrypt.hash(this.confirm_password, salt);
    }
    next()
})

const schemaModal = mongoose.model('businessProfile', schema);

module.exports = schemaModal;
