const Modals = require("../Models/index");
const jwt = require('jsonwebtoken');

const userProtectRoute = (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                let token = req.headers.authorization.split(' ')[2];
                if (token) {
                    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
                        if (err) {
                            return res.status(401).json({
                                success: false,
                                msg: "Token not valid.",
                                token: false
                            })
                        }
                        Modals.user.findById({ _id: data._id }).then(data => {
                            if ((data && data.token == token)) {
                                req.jwt_account = data;
                                req.user = data;
                                next()
                            } else {
                                return res.status(401).json({
                                    success: false,
                                    msg: "User account not found.",
                                    token: false
                                })
                            }
                        })

                    })
                } else {
                    return res.status(401).json({
                        error: true,
                        msg: "Not authorized, no token"
                    })
                }
            } catch (error) {
                return res.status(401).json({
                    error: true,
                    msg: "Not authorized, token failed"
                })
            }
        } else {
            return res.status(401).json({
                error: true,
                msg: "Not authorized, token failed"
            })
        }
    } catch (error) {
        console.log("User MiddleWare LOGs", error.message)
    }

}

const businessProfileProtectRoute = (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                let token = req.headers.authorization.split(' ')[2];
                if (token) {
                    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
                        if (err) {
                            return res.status(401).json({
                                success: false,
                                msg: "Token not valid.",
                                token: false
                            })
                        }
                        Modals.businessProfile.findById({ _id: data._id }).then(data => {
                            if ((data && data.jwtoken == token)) {
                                req.jwt_account = data;
                                req.user = data;
                                next()
                            } else {
                                return res.status(401).json({
                                    success: false,
                                    msg: "Business account not found.",
                                    token: false
                                })
                            }
                        })

                    })
                } else {
                    return res.status(401).json({
                        error: true,
                        msg: "Not authorized, no token"
                    })
                }
            } catch (error) {
                return res.status(401).json({
                    error: true,
                    msg: "Not authorized, token failed"
                })
            }
        } else {
            return res.status(401).json({
                error: true,
                msg: "Not authorized, token failed"
            })
        }
    } catch (error) {
        console.log("User MiddleWare LOGs", error.message)
    }

}
module.exports = { userProtectRoute,businessProfileProtectRoute };
