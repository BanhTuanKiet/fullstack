const speakeasy = require('speakeasy')
const db = require('../Config/ConfigDb')
const nodemailer = require('nodemailer')

const createOTP = async  (email) => {
    const orignalEmail = (email.replace(/"/g, ''))
    let secret
    const sql = `SELECT base32 FROM secret 
               WHERE id_customer = (SELECT id FROM customer WHERE Email = ?)`

    await db.query(sql, [orignalEmail], (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal Server Error.' })
        }
        if (data.length < 0) {
            return res.status(500).json({ success: false, message: 'Internal Server Error.' })
        }
        secret = data[0].base32
    })

    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    })
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kiett5153@gmail.com',
            pass: ''
        }
    })

    const mailOptions = {
        from: '',
        to: '',
        subjet: 'Your Account Verification Code',
        text: 'wegwef'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        }
        // console.log('Emai sent: ', info.response)
    })

    const otp = {
        token: token,
        secret: secret
    }
    return otp
}

module.exports = {
    createOTP
}