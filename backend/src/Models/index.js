const Modals = {}

Modals.user = require('./userModal');
Modals.contact = require('./contactModal');
Modals.resetPassword = require('./resetPasswordModal')
Modals.businessProfile = require('./businessProfileModal')
Modals.video = require('./videoModal')
Modals.verifyEmail = require('./verifyEmail')
Modals.service = require('./serviceModal')
Modals.subscription = require('./subscriptionModal')

module.exports = Modals;