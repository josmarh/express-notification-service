const { Worker } = require('bullmq')
const connection = require('../config/redis')
const sendEmail = require('../services/emailService')

const worker = new Worker(
    'notifications',
    async job => {

        const { email, event, data } = job.data

        if (event === 'TASK_ASSIGNED') {
            await sendEmail(email, 'Task Assigned', `Task: ${data.taskTitle}`)
        }
    },
    { connection }
)

worker.on('completed', job => {
    console.log(`Job ${job.id} completed`)
})

worker.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed:`, err.message)
})