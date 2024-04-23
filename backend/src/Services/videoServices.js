const modals = require("../Models/index")


module.exports = {
    findVideoByUserId: (id) => new Promise((resolve, reject) => {
        modals.video.find({ userId: id })
            .then(res => {
                if (!res) {
                    resolve({ notFound: true });
                } else {
                    resolve(res);
                }
            })
            .catch(err => reject(err));
    }),

    findVideoById: (id) => new Promise(async (resolve, reject) => {
        try {
          const video = await modals.video.findById(id).populate('userId');
          resolve(video || { notFound: true });
        } catch (err) {
          console.log("Error finding video by ID:", err);
          reject(err);
        }
      }),
      findByIdAndRemove: (id) => new Promise((resolve, reject) => {
        modals.video.deleteOne({ _id: id })
          .then(res => {
            if (!res) {
              resolve({ notFound: true });
            } else {
              resolve(res);
            }
          })
          .catch(err => reject(err));
      }),
    updateVideoById: (id, updatePayload) => new Promise((resolve, reject) => modals.video.findOneAndUpdate({ _id: id }, { $set: updatePayload }, { new: true }).then(res => resolve(res)).catch(err => reject(err))),

  
}  