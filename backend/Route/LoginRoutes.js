const express = require('express')
const loginRoute = express.Router()

const { getPassword, login } = require('../Controller/LoginController')
const { signup } = require('../Controller/SignupController')
const { encryptionPassword } = require('../middleware/encryption')
const { validation } = require('../Util/validation')

//login
// loginRoute.use(validation)
loginRoute.post('/', validation, getPassword, encryptionPassword, login)
loginRoute.post('/signup', validation, signup)

module.exports = {
    loginRoute,
}