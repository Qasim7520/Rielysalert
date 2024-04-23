const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const testRegistrationToken = 'YOUR_TEST_REGISTRATION_TOKEN';

const message = {
    data: {
        key1: 'value1',
    },
    token: testRegistrationToken,
};

admin.messaging().send(message)
    .then((response) => {
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });
