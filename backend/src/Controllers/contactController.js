const globalServices = require("../Services/index");

// *************************************************************************
module.exports = {

    addContact: async (req, res) => {
        try {
            const { added_by, ...contactData } = req.body;
            const user = await globalServices.user.findUserAccountById(added_by);
            if (user && user.contactCount < 3) {
                user.contactCount += 1;
                await user.save();
                const savedContact = await globalServices.contact.addContact(added_by, contactData);
                if (savedContact && savedContact?._id) {
                    return globalServices.global.returnResponse(res, 200, false, "contact added successfully ", savedContact)
                }
                else {
                    return globalServices.global.returnResponse(res, 404, false, "contact not added.", savedContact)
                }
            }
            else {
                return globalServices.global.returnResponse(res, 403, false, "Maximum contact limit reached.", {})
            }

        } catch (error) {
            console.log("Error adding contact: ", error.message)
            return globalServices.global.returnResponse(res, 500, true, error.message, {})
        }
    },

    updateContact: async (req, res) => {
        try {
            const { added_by, contactId } = req.body;
            const updatedData = req.body;


            const updatedContact = await globalServices.contact.updateContact(added_by, contactId, updatedData);

            return res.status(200).json({
                status: 200,
                error: false,
                msg: 'Contact updated successfully',
                data: updatedContact,
            });
        } catch (error) {
            console.error('Error updating contact:', error.message);
            return res.status(500).json({
                status: 500,
                error: true,
                msg: `Something went wrong: ${error.message}`,
                data: {},
            });
        }
    },

    getContactById: async (req, res) => {
        try {
            const { id } = req.params;
            const contact = await globalServices.contact.findContactById(id);
            if (contact && contact?._id) {
                return globalServices.global.returnResponse(res, 200, false, "contact found ", contact)
            }
            else {
                return globalServices.global.returnResponse(res, 404, false, "contact not found ", {})

            }
        } catch (error) {
            console.log("Error getting contact: ", error.message)
            return globalServices.global.returnResponse(res, 500, true, error.message, {})
        }
    },

    getContactByUserId: async (req, res) => {
        try {
            const { id } = req.params;
            const contacts = await globalServices.contact.findContactByUserId(id);
            if (contacts) {
                return globalServices.global.returnResponse(res, 200, false, "contacts found ", contacts)
            }
            else {
                return globalServices.global.returnResponse(res, 404, false, "contacts not found ", {})

            }
        } catch (error) {
            console.log("Error getting contact: ", error.message)
            return globalServices.global.returnResponse(res, 500, true, error.message, {})
        }
    },

    deleteContactById: async (req, res) => {
        try {
            const { id } = req.params;
            const contactData = await globalServices.contact.findContactById(id)
            const contact = await globalServices.contact.findByIdAndRemove(id);
            if (contact.deletedCount > 0) {
                let updatedUserResult = await globalServices.user.updateUserAccountById(contactData.added_by._id, { contactCount: contactData.added_by.contactCount - 1 });
                return globalServices.global.returnResponse(res, 200, false, "contact deleted successfully", contact)
            }
            else {
                return globalServices.global.returnResponse(res, 404, false, "contact not found ", {})

            }
        } catch (error) {
            console.log("Error deleting contact: ", error.message)
            return globalServices.global.returnResponse(res, 500, true, error.message, {})
        }
    },

    // **********************************************************************
}

