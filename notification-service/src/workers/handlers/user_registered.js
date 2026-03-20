const sendEmail = require('../../services/emailService')

module.exports = async function userRegistered(data) {
    const { email, data: { name } } = data

    await sendEmail(
        email,
        `Welcome! ${name}`,
        'Thanks for registering 🎉'
    )
}