const express = require('express')
const loginRoute = express.Router()

const { getPassword, login } = require('../Controller/LoginController')
const { signup } = require('../Controller/SignupController')
const { AuthPassword } = require('../middleware/AuthPassword')
const { validation } = require('../Util/validation')

//login
// loginRoute.use(validation)
loginRoute.post('/', getPassword, AuthPassword, login)
loginRoute.post('/signup', signup)

module.exports = {
    loginRoute,
}