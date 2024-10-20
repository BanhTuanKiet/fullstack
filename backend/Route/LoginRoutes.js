const express = require('express')
const loginRoute = express.Router()

const { getPassword, login } = require('../Controller/LoginController')
const { signup } = require('../Controller/SignupController')
const { AuthPassword } = require('../middleware/AuthPassword')
const { validation } = require('../Util/validation')
const { EncryptionPassword } = require('../middleware/EncryptionPassword')

//login
loginRoute.post('/', validation, getPassword, AuthPassword, login)
loginRoute.post('/signup', validation, EncryptionPassword, signup)

module.exports = {
    loginRoute,
}