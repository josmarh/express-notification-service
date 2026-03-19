const fs = require('fs')
const path = require('path')

// const handlers = {
//     TASK_ASSIGNED: require('../handlers/taskAssigned'),
//     USER_REGISTERED: require('../handlers/userRegistered'),
//     PASSWORD_RESET: require('../handlers/passwordReset')
// }

// Instead of manually registering handlers, auto-load them:
const handlers = {}

const files = fs.readdirSync(path.join(__dirname, '../handlers'))

for (const file of files) {
    const eventName = file.replace('.js', '').toUpperCase()
    handlers[eventName] = require(`../handlers/${file}`)
}

async function notificationProcessor(job) {
    const { event } = job.data

    const handler = handlers[event]
    
    if (!handler) {
        throw new Error(`No handler found for event: ${event}`)
    }

    await handler(job.data)
}

module.exports = notificationProcessor