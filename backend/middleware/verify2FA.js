const speakeasy = require('speakeasy')
const db = require('../Config/ConfigDb')

const verify2FA = async (req, res, next) => {
    console.log("Dawdws")
    try {
        const { otp, email } = req.body

        let secret = ''
        const sql = `SELECT base32 FROM secret 
                   WHERE id_customer = (SELECT id FROM customer WHERE Email = ?)`
    
        await db.query(sql, [email], (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Internal Server Error.' })
            }
            if (data.length < 0) {
                return res.status(500).json({ success: false, message: 'Internal Server Error.' })
            }
            secret = data[0].base32
        })

        const verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: otp,
            window: 1
        })

        if (verified) {
            res.json({ success: true, message: "Xác thực 2FA thành công" })
        } else {
            res.json({ success: false, message: "Token 2FA không hợp lệ" })
        }
    } catch (error) {
        console.error("Lỗi xác thực 2FA:", error)
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}

module.exports = {
    verify2FA
}