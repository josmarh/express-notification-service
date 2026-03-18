const sendEmail = require('../../services/emailService')

async function notificationProcessor(job) {

  const { email, event, data } = job.data

    if (event === 'TASK_ASSIGNED') {
        await sendEmail(
            email,
            'Task Assigned',
            `Task: ${data.taskTitle}`
        )
    }

}

module.exports = notificationProcessor