const express = require('express');
const bodyParser = require('body-parser');
const videoController = require('../../Controllers/videoController');
const { userProtectRoute } = require('../../Middleware/authMiddleware');
const { isValidUserIdFromParams,isValidVideoIdFromParams,isValidVideoIdFromBody } = require('../../Middleware/idMiddleware');
const jsonParser = bodyParser.json({ limit: '500mb' });
const router = express.Router();
router.post('/upload',jsonParser,userProtectRoute,express.json(), videoController.handleVideoUpload);
router.get('/:id', userProtectRoute, isValidUserIdFromParams, videoController.getAllVideoByUserId);
router.delete('/:id', userProtectRoute,isValidVideoIdFromParams, videoController.deleteVideoById);
router.patch('/purchase', userProtectRoute,express.json(),isValidVideoIdFromBody, videoController.updateVideoPurchase);

module.exports = router;
