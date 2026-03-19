const sendEmail = require('../../services/emailService')

module.exports = async function taskAssigned(data) {
    const { email, data: taskData } = data

    await sendEmail(
        email,
        'Task Assigned',
        `You have been assigned a task: ${taskData.taskTitle}`
    )
}