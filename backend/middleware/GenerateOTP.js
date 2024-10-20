const speakeasy = require('speakeasy')
const { SendEmail } = require('./SendMail')
const Customer = require('../Model/Customer')
const SecretKey = require('../Model/SecretKey')
const { where } = require('sequelize')

const GenerateOTP = async (email) => {
    let secret

    try {
        const orignalEmail = (email.replace(/"/g, ''))

        const result = await Customer.findOne({
            where: {
                email: orignalEmail
            },
            include: [{
                model: SecretKey,
                attributes: ['base32']
            }],
            // attributes: [] // no need to select other fields from customer
        })

        secret = result.Secret.base32
    } catch (error) {
        console.log('Generate OTP error: ', error)
        return false
    }

    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    })

    console.log("Generate OTP: ", token)

    SendEmail(token)
}

module.exports = {
    GenerateOTP
}