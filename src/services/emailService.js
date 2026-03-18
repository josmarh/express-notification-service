const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

async function sendEmail(to, subject, text) {
    try {
        const result = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        })

        console.log('✅ Email sent:', result)
    } catch (error) {
        console.error('❌ Email error:', error.message)
        throw error
    }
}

module.exports = sendEmail