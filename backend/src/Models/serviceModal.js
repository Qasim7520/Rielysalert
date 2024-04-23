const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: String,
    subServices: [String]
});

module.exports = mongoose.model("service", serviceSchema);