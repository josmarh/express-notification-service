const notificationClient = require('../clients/notificationClient');
const queue = require('../shared/queue/notificationQueue')

exports.sendPasswordResetLink = async ({ email, resetLink }) => {
    // Confirm email exists on the DB

    try {
        // await notificationClient.post('/notifications', {
        //     event: 'PASSWORD_RESET',
        //     email,
        //     data: { resetLink }
        // })
        await queue.add('send-notification', {
            event: 'PASSWORD_RESET',
            email,
            data: { resetLink }
        })
    } catch (err) {
        console.error('Notification failed:', err.message);
        throw err
    }

    return {
        email
    }
}