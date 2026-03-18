
const notificationQueue = require('../queues/notificationQueue')
const Joi = require('joi')

exports.createNotification = async (req, res) => {
    const payload = {
        event: req.body.event,
        email: req.body.email,
        data: req.body.data
    }

    // Validate input
    const schema = Joi.object({
        event: Joi.string().required(),
        email: Joi.string().email().required(),
        data: Joi.object().required()
    })

    const { error } = schema.validate(payload);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const job = await notificationQueue.add('send-notification', payload,
            {
                attempts: 3,                 // retry up to 3 times
                backoff: {
                    type: 'exponential',
                    delay: 5000               // wait 5s before retry
                }
            }
        )

        res.status(201).json({ message: 'Notification queued', jobId: job.id })
    } catch (error) {
        res.status(500).json({ message: 'Error queuing notification' })
    }
}