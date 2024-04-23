const express = require('express');
const router = express.Router();
const serviceController = require('../../Controllers/serviceController');
const serviceValidateController = require('../../Validators/serviceValidation');
const { userProtectRoute } = require('../../Middleware/authMiddleware');

router.use(express.json());

router.get('/', userProtectRoute,serviceController.getServices);
router.get('/:serviceName', userProtectRoute,serviceController.getSubServices);
router.post('/', userProtectRoute,serviceValidateController.create_service, serviceController.createService);

module.exports = router;