const jwt = require('jsonwebtoken')

const authenToken = (req, res, next) => {
    const authorizationClient = req.headers['authorization']
    const token = authorizationClient && authorizationClient

    if (!token)
        return res.sendStatus(401)

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // Explanation token without validation.
        // jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (err) {
        return res.json({ success: false, message: "Your session has expired. Please log in again."})
    }
}

module.exports = {
    authenToken
}