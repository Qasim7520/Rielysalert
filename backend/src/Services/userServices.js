const modals = require("../Models/index")


module.exports = {
    findUserByObjects: (payLoad) => new Promise((resolve, reject) => modals.user.findOne(payLoad).then(data => resolve(data)).catch(error => { console.log("error => findUserBYObjects:", error); reject("") })),
    updateUserAccountById: (id, updatePayload) => new Promise((resolve, reject) => modals.user.findOneAndUpdate({ _id: id }, { $set: updatePayload }, { new: true }).then(res => resolve(res)).catch(err => reject(err))),
    findUserByResetTable: (payLoad) => new Promise((resolve, reject) => modals.resetPassword.findOne(payLoad).then(data => resolve(data)).catch(error => { console.log("error => findUserByResetTable:", error); reject("") })),
    findUserAccountById: (id) => new Promise((resolve, reject) => {
        modals.user.findOne({ _id: id })
            .then(res => {
                if (!res) {
                    resolve({ notFound: true });
                } else {
                    resolve(res);
                }
            })
            .catch(err => reject(err));
    }),

    signUp: async (payLoad) => {
        try {
            let savingObjects = modals.user(payLoad);
            let result = await savingObjects.save();
            if (result && result._id) { return result } else { console.log("error => signUp :", result); throw "" }
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    resetPassword: async (payLoad) => {
        try {
            console.log('PAYLOAD:', payLoad);
            let savingObjects = modals.resetPassword(payLoad);
            let result = await savingObjects.save();
            if (result && result._id) { return result } else { console.log("error => resetPassword :", result); throw "" }
        } catch (error) {
            console.log(error)
            throw error
        }
    },

}  