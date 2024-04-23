const modals = require("../Models/index")


module.exports = {
  findContactByObjects: (payLoad) => new Promise((resolve, reject) => modals.contact.findOne(payLoad).then(data => resolve(data)).catch(error => { console.log("error => findContactBYObjects:", error); reject("") })),
  findContactById: (id) => new Promise(async (resolve, reject) => {
    try {
      const contact = await modals.contact.findById(id).populate('added_by');
      resolve(contact || { notFound: true });
    } catch (err) {
      console.log("Error finding contact by ID:", err);
      reject(err);
    }
  }),
  findByIdAndRemove: (id) => new Promise((resolve, reject) => {
    modals.contact.deleteOne({ _id: id })
      .then(res => {
        if (!res) {
          resolve({ notFound: true });
        } else {
          resolve(res);
        }
      })
      .catch(err => reject(err));
  }),
  findContactByUserId: (id) => new Promise((resolve, reject) => {
    modals.contact.find({ added_by: id })
      .then(res => {
        if (!res) {
          resolve({ notFound: true });
        } else {
          resolve(res);
        }
      })
      .catch(err => reject(err));
  }),

  addContact: async (addedById, contactData) => {
    try {
      const existingContact = await modals.contact.findOne({
        added_by: addedById,
        $or: [
          { email: contactData.email },
          { phone: contactData.phone }
        ]
      });

      if (existingContact) {
        throw new Error('Contact already exists for the user');
      }

      const newContact = new modals.contact({
        added_by: addedById,
        ...contactData,
      });

      const savedContact = await newContact.save();
      return savedContact;
    } catch (error) {
      throw error;
    }
  },
  updateContact: async (addedById, contactId, updatedData) => {
    try {
      const existingContact = await modals.contact.findOne({
        _id: contactId,
        added_by: addedById,
      });

      if (!existingContact) {
        throw new Error('Contact not found for the user');
      }

      Object.assign(existingContact, updatedData);

      const updatedContact = await existingContact.save();
      return updatedContact;
    } catch (error) {
      throw error;
    }
  }
}  