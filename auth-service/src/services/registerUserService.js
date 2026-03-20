const notificationClient = require('../clients/notificationClient');
const queue = require('../shared/queue/notificationQueue')
const User = require('../../models/User');

exports.registerUser = async ({ name, email, password }) => {
    try {
        const user = await User.create({ name, email, password });

        await queue.add('send-notification', {
            event: 'USER_REGISTERED',
            email,
            data: { name: name }
        })

        const userData = user.toJSON();
        delete userData.password;
        delete userData.refresh_token;
        delete userData.deleted_at;

        return userData;
    } catch (err) {
        console.error('Notification failed:', err.message);
        throw err
    }
}