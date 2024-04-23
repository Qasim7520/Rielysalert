const mongoose = require("mongoose");
const User = require('../Models/userModal')
const schema = mongoose.Schema(
    {
        added_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "Added_by is required."],
        },
        name: {
            type: String,
            required: [true, 'Name is required.']
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
        },
        phone: {
            type: String,
            default: '',
        },

    },
    {
        timestamps: true,
    }
)

const schemaModal = mongoose.model('contact', schema);

module.exports = schemaModal;
