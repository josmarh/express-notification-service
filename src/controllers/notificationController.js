
const notificationQueue = require('../queues/notificationQueue')

exports.createNotification = async (req, res) => {
    // Validate input
    const payload = {
        event: req.body.event,
        userId: req.body.userId,
        email: req.body.email,
        data: req.body.data
    }

    const job = await notificationQueue.add('send-notification', payload,
        {
            attempts: 3,                 // retry up to 3 times
            backoff: {
                type: 'exponential',
                delay: 5000               // wait 5s before retry
            }
        }
    )

    res.status(201).json({
        message: 'Notification queued',
        jobId: job.id
    })
}