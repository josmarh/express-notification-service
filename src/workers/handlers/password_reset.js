const sendEmail = require('../../services/emailService')

module.exports = async function userRegistered(data) {
    const { email } = data

    await sendEmail(
        email,
        'Password Reset',
        'You have requested a password reset. Please click the link to reset your password.'
    )
}