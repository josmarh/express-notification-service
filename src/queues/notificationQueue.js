const { Queue, Worker } = require('bullmq')
const connection = require('../config/redis')

const notificationQueue = new Queue('notifications', {
  connection
})

module.exports = notificationQueue