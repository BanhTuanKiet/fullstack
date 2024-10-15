const speakeasy = require('speakeasy')
const database = require('../Config/ConfigDb')

const verify2FA = async (req, res, next) => {
    const sql = `SELECT base32 FROM secret
               WHERE id_customer = (SELECT id FROM customer WHERE Email = ?)`
    let secret
    const { otp, email } = req.body
    try {

        const results = await database.query(sql, [email])

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Email not found.' })
        }

        secret = results[0][0].base32

    } catch (error) {
        console.error("Verify OTP error:", error)
        res.status(500).json({ success: false, message: "Error retrieving secret key", })
    }

    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: otp,
        window: 1
    })

    if (verified) {
        res.status(200).json({ success: true, message: "2FA verification successful" })
    } else {
        res.status(200).json({ success: false, message: "Invalid 2FA token" })
    }
}

module.exports = {
    verify2FA
}