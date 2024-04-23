const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const userController = require('../../Controllers/userController');
const { userProtectRoute } = require('../../Middleware/authMiddleware');
const { isValidUserIdFromBody } = require('../../Middleware/idMiddleware');
router.use(express.json());

router.get('/', userProtectRoute, userController.getProfile);
router.patch('/',upload.single('file'),userProtectRoute,isValidUserIdFromBody, userController.updateProfile);

module.exports = router;