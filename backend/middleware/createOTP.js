const speakeasy = require('speakeasy')
const db = require('../Config/ConfigDb')

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
    
    console.log("OTP: ", token)

    const otp = {
        token: token,
        secret: secret
    }
    return otp
}

module.exports = {
    createOTP
}