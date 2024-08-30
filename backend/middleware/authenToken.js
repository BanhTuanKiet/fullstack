const jwt = require('jsonwebtoken')

const authenToken = (req, res, next) => {
    const authorizationClient = req.headers['authorization']
    const token = authorizationClient && authorizationClient

    if (!token)
        return res.sendStatus(401)

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (err) {
        return res.sendStatus(403)
    }
}

module.exports = {
    authenToken
}