const { Worker } = require('bullmq')
const connection = require('../config/redis')
const notificationProcessor = require('./processors/notificationProcessor')

const worker = new Worker(
    'notifications', notificationProcessor, { connection }
)

worker.on('completed', job => {
    console.log(`[SUCCESS] Job ${job.id} completed`)
})

worker.on('failed', (job, err) => {
    console.error(`[FAILED] Job ${job.id} failed:`, err.message)
})