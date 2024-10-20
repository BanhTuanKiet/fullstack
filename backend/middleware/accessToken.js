require('dotenv').config()
const jwt = require('jsonwebtoken')

const tokenSecret = process.env.TOKEN_SECRET

const accessToken = (req, res, next) => {
    const authorizationClient = req.headers['authorization']
    const token = authorizationClient && authorizationClient

    if (!token)
        return res.sendStatus(401)

    try {
        jwt.verify(token, tokenSecret)
        // Explanation token without validation.
        // jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
        req.status = 200
    } catch (err) {
        req.status = 401
    }
    next()
}

module.exports = {
    accessToken
}