const express = require('express');
const router = express.Router();
const businessProfileController = require('../../Controllers/businessProfileController');
const businessProfileValidatior = require('../../Validators/businessProfileValidationController');
const { userProtectRoute } = require('../../Middleware/authMiddleware');
const { businessProtectRoute } = require('../../Middleware/businessProfileAuthMiddleware');
const { isValidUserIdFromParams } = require('../../Middleware/idMiddleware');

router.use(express.json());

router.post('/', businessProfileValidatior.create_business_profile, businessProfileController.createBusinessProfile);
router.post('/:businessId/rating',userProtectRoute, businessProfileValidatior.business_profile_rating, businessProfileController.profileRating);
router.post('/login', businessProfileController.Login);
router.get('/services', userProtectRoute, businessProfileController.getAllBusinessProfile);
router.get('/profile', userProtectRoute, businessProfileController.getBusinessProfiles);
router.post('/verify', businessProfileController.verifyAccount);
router.get('/', businessProtectRoute, businessProfileController.getBusinessProfileUser);
router.patch('/update', businessProtectRoute, businessProfileController.updateBusinessProfile)
module.exports = router;
