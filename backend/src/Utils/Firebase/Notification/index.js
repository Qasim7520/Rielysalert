const admin = require('./connection')

const sendPushNotification = (fcm_token, longitude, latitude) => {
    try {
        const googleMapsLink = `https://www.google.com/maps?q=${longitude},${latitude}`;

        const smsMessage = `Here is my location:\n\n ${googleMapsLink}`;
        const message = {
            notification: {
                title: 'Rileys Alert',
                body:  smsMessage
            },
            data: {
                jobID: "currentJobID",
                data: googleMapsLink
            },
            token: fcm_token, 
        };

        const sendNotification = (message) => {
            admin
                .messaging()
                .send(message)
                .then((response) => {
                    console.log('Sent Successfully', response);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        };

        sendNotification(message);

    } catch (error) {
        console.log("Error in Sending Notification", error);
        throw error
    }
};

module.exports = {
    sendPushNotification,
};
