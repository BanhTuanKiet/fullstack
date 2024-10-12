const express = require('express')
const verifyOTPRoute = express.Router()

const { verify2FA } = require('../middleware/verify2FA')

verifyOTPRoute.post('/verifyOTP', verify2FA)

module.exports = {
    verifyOTPRoute
}