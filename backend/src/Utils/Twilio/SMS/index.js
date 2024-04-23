const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = '+15712902397'; 

const sendSMS = async (phoneNumber,longitude,latitude) => {
    try {
        const client = require('twilio')(accountSid, authToken);
        const googleMapsLink = `https://www.google.com/maps?q=${longitude},${latitude}`;

        const smsMessage = `Here is my location:\nGoogle Maps Link:\n ${googleMapsLink}`;

        await client.messages.create({
            body: smsMessage,
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        console.log(`SMS sent to ${phoneNumber}`);
    } catch (error) {
        console.error("There was an error while sending SMS:", error);
    }
};

module.exports = {
    sendSMS,
};
