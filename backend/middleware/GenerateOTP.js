const speakeasy = require('speakeasy')
const { SendEmail } = require('./SendMail')
const database = require('../Config/ConfigDb')

const GenerateOTP = async (email) => {
    const sql = `SELECT base32 FROM customer 
                JOIN secret ON id_customer = id
                WHERE email = ?`
    let secret

    try {
        const orignalEmail = (email.replace(/"/g, ''))

        const [results, fields] = await database.query(sql, [orignalEmail])

        if (results.length === 0) {
            return res.status(500).json({ success: false, message: 'Email not found in the database.' })
        }

        secret = results[0].base32

    } catch (error) {
        console.log('Generate OTP error: ', error)
        return false
    }

    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    })

    console.log("Generate: ", secret)
    console.log("Generate OTP: ", token)

    SendEmail(token)
}

module.exports = {
    GenerateOTP
}