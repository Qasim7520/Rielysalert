const globalServices = require("../Services/index");
const sendEmail = require("../Services/nodemailer/sendEmail");
const modals = require("../Models/index")

module.exports = {
    createService: async (req, res) => {
        const service = new modals.service({
            name: req.body.name,
            subServices: req.body.subServices
        });
        try {
            const newService = await service.save();
            return globalServices.global.returnResponse(res, 201, false, 'Service created successfully', newService);
        } catch (err) {
            return globalServices.global.returnResponse(res, 500, true, error.message, {})
        }
    },

    getServices: async (req,res)=>{
        try {
            const services = await modals.service.find();
            return globalServices.global.returnResponse(res, 200, false, "Services found",services)

        } catch (err) {
            return globalServices.global.returnResponse(res, 500, true, error.message, {})
        }
    },

    getSubServices: async (req,res)=>{
        const serviceName = req.params.serviceName;
    try {
        const service = await modals.service.findOne({ name: serviceName });
        if (!service) {
            return globalServices.global.returnResponse(res, 404, false, "Service not found",{})
        }
        return globalServices.global.returnResponse(res, 200, false, "Sub Services found",service.subServices)
    } catch (err) {
        return globalServices.global.returnResponse(res, 500, true, error.message, {})
    }
    }


   
}