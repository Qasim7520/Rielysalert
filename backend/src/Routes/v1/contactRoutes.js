const express = require('express');
const router = express.Router();
const contacController = require('../../Controllers/contactController');
const userValidateController = require('../../Validators/userVlidationController');
const { userProtectRoute } = require('../../Middleware/authMiddleware');
const {  isValidAddedByIdFromBody, isValidContactIdFromBody, isValidContactIdFromParams, isValidUserIdFromParams } = require('../../Middleware/idMiddleware');

router.use(express.json());

router.get('/:id', userProtectRoute, isValidContactIdFromParams, contacController.getContactById);
router.get('/user/:id', userProtectRoute, isValidUserIdFromParams, contacController.getContactByUserId);
router.post('/', userProtectRoute, userValidateController.addContact, isValidAddedByIdFromBody, contacController.addContact);
router.patch('/', userProtectRoute, userValidateController.addContact, isValidAddedByIdFromBody, isValidContactIdFromBody, contacController.updateContact);
router.delete('/:id', userProtectRoute, isValidContactIdFromParams, contacController.deleteContactById);

module.exports = router;