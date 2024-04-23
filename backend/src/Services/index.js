const globalServices = {}

globalServices.global = require('./globalServices');
globalServices.user = require('./userServices');
globalServices.contact = require('./contactServices');
globalServices.businessProfile = require('./businessProfileServices');
globalServices.video = require('./videoServices');

module.exports = globalServices;

