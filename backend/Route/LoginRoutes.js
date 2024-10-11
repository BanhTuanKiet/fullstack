const express = require('express')
const loginRoute = express.Router()
const verifyOTPRoute = express.Router()

const { getPassword, login } = require('../Controller/LoginController')
const { signup } = require('../Controller/SignupController')
const { encryptionPassword } = require('../middleware/encryption')
const { validation } = require('../Util/validation')
const { verify2FA } = require('../middleware/verify2FA')

verifyOTPRoute.post('/verifyOTP', verify2FA)
//login
// loginRoute.use(validation)
loginRoute.post('/', validation, getPassword, encryptionPassword, login)
// loginRoute.post('/', login)
loginRoute.post('/signup', validation, signup)

module.exports = {
    loginRoute,
    verifyOTPRoute
}