const modals = require("../Models/index")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const crypto = require("crypto");

module.exports = {
    findBusinessProfileByObjects: (payLoad) => new Promise((resolve, reject) => modals.businessProfile.findOne(payLoad).then(data => resolve(data)).catch(error => { console.log("error => findBusinessProfileByObjects:", error); reject("") })),
    updateBusinessProfileById: (id, updatePayload) => new Promise((resolve, reject) => modals.businessProfile.findByIdAndUpdate({ _id: id }, { $set: updatePayload }, { new: true }).then(res => resolve(res)).catch(err => reject(err))),
    signJWT: async (payload) => {
        try {
            return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6d' });
        } catch (error) {
            console.log('Error signing JWT:', error);
            throw error;
        }
    },
    updateJWTToken: async (userId, payLoad) => {
        try {
            return await modals.businessProfile.findOneAndUpdate(
                { _id: userId },
                { $set: payLoad },
                { new: true }
            );
        } catch (error) {
            console.log('Error updating JWT token:', error);
            throw error;
        }
    },
    generateEmailVerifyToken: async (payload) => {
        try {
            const token = crypto.randomBytes(16).toString("hex");
            return await new modals.verifyEmail({
                userId: payload,
                token: token,
            }).save();
        } catch (error) {
            console.log('Error generating verification token:', error);
            throw error;
        }
    },

    updateUserVerifyStatus: async (payload) => {
        try {
            const updatedUser = await modals.businessProfile.findOneAndUpdate(
                { _id: payload },
                { $set: { isverified: true } },
                { new: true }
            );

            return updatedUser;
        } catch (error) {
            console.log('Error updating user verification status:', error);
            throw error;
        }
    },

    deleteVerifyToken: async (payload) => {
        try {
            const deletetoken = await modals.verifyEmail.findByIdAndRemove({ _id: payload });
            return deletetoken;
        } catch (error) {
            console.log('Error deleting verification token:', error);
            throw error;
        }
    },

    findBusinessAccountById: (id) => new Promise((resolve, reject) => {
        modals.businessProfile.findOne({ _id: id })
            .then(res => {
                if (!res) {
                    resolve({ notFound: true });
                } else {
                    resolve(res);
                }
            })
            .catch(err => reject(err));
    }),
    findBusinessAccountsByFreeStatus: (longitude, latitude) => new Promise((resolve, reject) => {
        modals.businessProfile.find({

            status: 'free',
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 5000
                }
            }
        })
            .then(res => {
                if (!res) {
                    resolve({ notFound: true });
                } else {
                    resolve(res);
                }
            })
            .catch(err => reject(err));
    }),
    findBusinessAccountsByPaidStatus: () => new Promise((resolve, reject) => {
        modals.businessProfile.find({ status: 'paid' })
            .then(res => {
                if (!res) {
                    resolve({ notFound: true });
                } else {
                    resolve(res);
                }
            })
            .catch(err => reject(err));
    }),
    createbusinessProfile: async (payLoad) => {
        try {
            let savingObjects = modals.businessProfile(payLoad);
            let result = await savingObjects.save();
            if (result && result._id) { return result } else { console.log("error => createbusinessProfile :", result); throw "" }
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    findUserById: (payLoad) => new Promise((resolve, reject) => modals.businessProfile.findById(payLoad).then(data => resolve(data)).catch(error => { console.log("error => findUserBYId:", error); reject("") })),


}  