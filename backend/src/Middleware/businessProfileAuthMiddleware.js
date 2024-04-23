const Modals = require("../Models/index");
const jwt = require('jsonwebtoken');

const businessProtectRoute = async (req, res, next) => {

    try {

        const token = req.headers.authorization?.split(' ')[2];
        if (!token) {
            return globalServices.global.returnResponse(res, 404, true, "Unauthorized: No token provided", null);
        }
        if (token) {
            const decode = await jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({
                        success: false,
                        msg: "Token not valid.",
                        token: false

                    })

                }

                else {
                    Modals.businessProfile.findById({ _id: data._id }).then(data => {



                        if ((data && data.jwtoken == token)) {

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
                }
            });
        }

    } catch (error) {
        console.error('Authentication error:', error);
        return globalServices.global.returnResponse(res, 401, true, "Unauthorized: Invalid token'", null);
    }

}

module.exports = { businessProtectRoute };
