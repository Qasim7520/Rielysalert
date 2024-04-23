const Modals = require('../Models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

module.exports = {
    JwtToken: (payLoad) => jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '90d', }),
    createOtp: () => {
        var digits = '0123456789';
        let OTP = '';
        const timestamp = Date.now();
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return { OTP, timestamp };
    },
    resetPasswordToken: () => {
        var digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let resetToken = '';
        for (let i = 0; i < 8; i++) {
            resetToken += digits[Math.floor(Math.random() * 36)];
        }
        return resetToken;
    },
    encryptedPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password
    },

    returnResponse: (res, status, error, msg, data) => res.status(status).json({ status, error, msg, data }),
}