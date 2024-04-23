const cron = require("node-cron");
const VideoModel = require("../Models/videoModal");
const globalServices = require("../Services/index");

const deleteOldVideos = async () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  try {
    const oldVideos = await VideoModel.find({ createdAt: { $lt: oneMonthAgo } });
    oldVideos.forEach(async (video) => {
        const userData=await globalServices.user.findUserAccountById(video?.userId);
        userData.videosCount -= 1;
        await userData.save();
      await VideoModel.findByIdAndDelete(video._id);
      console.log(`Deleted video with ID: ${video._id}`);
    });
  } catch (error) {
    console.error("Error deleting recent videos:", error);
  }
};

cron.schedule("0 0 * * *", () => {
    deleteOldVideos();
    console.log("Cron job executed to delete old videos.");
  });