const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');
const Video = require('../Models/videoModal');
const globalServices = require("../Services/index");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  correctClockSkew: true,
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = Date.now().toString() + '-' + file.originalname + '.mp4';
      cb(null, fileName);
    },
  }),
});


module.exports = {
handleVideoUpload : async (req, res, next) => {
    upload.single('file')(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'File upload failed' });
      }
  
      try {
        const userId=req.user?._id;
        console.log('FILE BODY::',req.user?._id)
        console.log('FILE::',req.file)
        const user = await globalServices.user.findUserAccountById(userId);
        if(user&&user?.videosCount<6)
        {
          const newVideo = new Video({
            userId,
            filename: req.file.originalname,
            s3Key: req.file.key,
            url: req.file.location,
          });
    
          await newVideo.save(); 
            user.videosCount += 1;
            await user.save();
            return globalServices.global.returnResponse(res, 201, false, "Video uploaded successfully ",newVideo)

        }
        else{
            return globalServices.global.returnResponse(res, 429, true, "Your monthly video uploading limit has reached",{})
        }
             
  
      } catch (error) {
        console.error(error);
        res.status(500).json({ error:error.message });
      }
    });
  },

 
getAllVideoByUserId: async (req, res) => {
    try {
        const { id } = req.params;
        const user = await globalServices.user.findUserAccountById(id);
        if(user&&user?._id)
        {
            const videos = await globalServices.video.findVideoByUserId(id);
            if (videos) {
                return globalServices.global.returnResponse(res, 200, false, "Videos found ", videos)
            }
            else {
                return globalServices.global.returnResponse(res, 404, false, "Videos not found ", {})

            }
        }
        else{
        return globalServices.global.returnResponse(res, 404, true, "User not found.", {});
        }

      
    } catch (error) {
        console.log("ERROR in getting user videos:", error);
        return globalServices.global.returnResponse(res, 500, true, "Something went wrong.", {});

    }
},
deleteVideoById: async (req, res) => {
    try {
        const { id } = req.params;
        const videoData = await globalServices.video.findVideoById(id)
        const video = await globalServices.video.findByIdAndRemove(id);
        if (video?.deletedCount > 0) {
            let updatedUserResult = await globalServices.user.updateUserAccountById(videoData.userId._id, { videosCount: videoData.userId.videosCount - 1 });
            return globalServices.global.returnResponse(res, 200, false, "video deleted successfully", video)
        }
        else {
            return globalServices.global.returnResponse(res, 404, false, "video not found ", {})

        }
    } catch (error) {
        console.log("Error deleting video: ", error.message)
        return globalServices.global.returnResponse(res, 500, true, error.message, {})
    }
},
updateVideoPurchase: async (req, res) => {
  try {
      const { id,isPurchased } = req.body;
      const videoData = await globalServices.video.findVideoById(id)
      const updatedResult= await globalServices.video.updateVideoById(id,{isPurchased})
      console.log("updatedResult",updatedResult)
      if(updatedResult)
        {
          return globalServices.global.returnResponse(res, 200, false, "video updated successfully ",updatedResult)
        }  
        else{
          return globalServices.global.returnResponse(res, 500, false, "Failed to update video. ", {})
        }

  } catch (error) {
      console.log("Error updating video: ", error.message)
      return globalServices.global.returnResponse(res, 500, true, error.message, {})
  }
},

}
  
