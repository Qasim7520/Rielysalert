const express = require('express');
const router = express.Router();
const userController = require('../../Controllers/userController');
const userValidateController = require('../../Validators/userVlidationController');
const { userProtectRoute } = require('../../Middleware/authMiddleware');
const { isValidUserIdFromBody } = require('../../Middleware/idMiddleware');

router.use(express.json());

router.post('/signup', userValidateController.create_account, userController.signUp);
router.post('/login', userValidateController.login, userController.login);
router.post('/resendotp', userValidateController.resendOtp, userController.resendOtp);
router.post('/verify-otp', userValidateController.verifyOtp, userController.verifyOtp);
router.post('/reset-password', userValidateController.resetPassword, userController.resetPassword);
router.post('/update-password', userValidateController.updatePassword, userController.updatePassword);
router.post('/verify-reset-otp', userValidateController.verifyOtp, userController.verifyResetPassOtp);
router.post('/generate-alert', userProtectRoute, isValidUserIdFromBody, userController.generateAlert);
router.get('/updated-token', userController.updatedToken);


module.exports = router;