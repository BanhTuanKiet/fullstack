require('dotenv').config()
const nodemailer = require('nodemon')

const SendEmail = (token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Verificatione Code",
        text:
            `Hi [User's Name],
            Use the code below to verify your account:
            Code: ${token}
            This code expires in 30 seconds. If you didn’t request this, please ignore this email.
            Best,
            [Company Name]`
    }

    transporter.sendEmail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    SendEmail
}