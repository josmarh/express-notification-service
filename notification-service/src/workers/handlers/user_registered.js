const sendEmail = require('../../services/emailService')

module.exports = async function userRegistered(data) {
    const { email } = data

    await sendEmail(
        email,
        'Welcome!',
        'Thanks for registering 🎉'
    )
}