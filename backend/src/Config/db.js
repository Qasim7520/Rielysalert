const mongoose = require("mongoose")

module.exports = async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL,
            { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Connected to MongoDB.")
    } catch (error) {
        console.log("Error connecting to mongodb::", error)
    }
}