const express = require('express');
const path = require("path");
const cors = require("cors");
const connectDB = require("./src/Config/db")

require("dotenv").config({
    path: path.join(__dirname, `.env.dev`),
});

const app = express();
const port = process.env.PORT || 5001;


const corsOptions = {
    origin: [
        process.env.FRONTEND_URL,
        process.env.FRONTEND_USER_URL,
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8081",
        "http://rileysalert.com:5000",
        "http://rileysalert.com",
        "*",

    ],
    methods: 'GET,POST,DELETE,UPDATE,PUT,PATCH',
    optionsSuccessStatus: 200,
    preflightContinue: false
};
app.use(cors(corsOptions));


app.get('/', (req, res) => res.send(`Server is running on port ${port}`));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

connectDB();

require("./src/Utils/cronJob");

app.use("/api/v1/user/", require("./src/Routes/v1/userRoutes"));
app.use("/api/v1/user/profile", require("./src/Routes/v1/profileRoutes"));
app.use("/api/v1/contact", require("./src/Routes/v1/contactRoutes"));
app.use("/api/v1/business-profile", require("./src/Routes/v1/businessRoutes"));
app.use("/api/v1/video", require("./src/Routes/v1/videoRoutes"));
app.use("/api/v1/service", require("./src/Routes/v1/serviceRoutes"));
app.use("/api/v1/subscription", require("./src/Routes/v1/subscriptionRoutes"));

