require('dotenv').config()
const jwt = require('jsonwebtoken')

const accessToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token)
        return res.sendStatus(401)

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        // Explanation token without validation.
        // jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
        req.email = decoded.email
        req.status = 200
    } catch (err) {
        req.status = 401
    }
    next()
}

module.exports = {
    accessToken
}