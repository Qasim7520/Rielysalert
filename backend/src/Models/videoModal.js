const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "User id is required."],
        },
        filename: {
            type: String,
            default: '',
        },
        s3Key: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            default: '',
        },
        isPurchased:{
            type:Boolean,
            default: false
        }

    },
    {
        timestamps: true,
    }
)

const schemaModal = mongoose.model('video', schema);

module.exports = schemaModal;
