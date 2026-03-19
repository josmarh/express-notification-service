const notificationClient = require('../clients/notificationClient');

exports.createTask = async ({ title, assignedTo }) => {
    // (later: save to DB)

    try {
        await notificationClient.sendTaskAssigned(assignedTo, title);
    } catch (err) {
        console.error('Notification failed:', err.message);
    }

    return {
        title,
        assignedTo
    }
}