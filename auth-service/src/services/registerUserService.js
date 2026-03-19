const notificationClient = require('../clients/notificationClient');
const queue = require('../shared/queue/notificationQueue')

exports.registerUser = async ({ username, email, password }) => {
    // Save to DB (omitted for simplicity)

    try {
        // await notificationClient.post('/notifications', {
        //     event: 'USER_REGISTERED',
        //     email,
        //     data: {}
        // })
        await queue.add('send-notification', {
            event: 'USER_REGISTERED',
            email,
            data: {}
        })
    } catch (err) {
        console.error('Notification failed:', err.message);
        throw err
    }

    return {
        username,
        email
    }
}