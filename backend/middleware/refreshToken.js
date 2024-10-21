require('dotenv').config()
const jwt = require('jsonwebtoken')

const tokenSecret = process.env.TOKEN_SECRET

const refreshToken = (req, res, next) => {
    const authorizationClient = req.body.refreshToken
    const token = authorizationClient && authorizationClient
    // const { email } = req.email

    if (!token)
        return res.sendStatus(401)

    if (req.status === 200) {
        next()
    }

    if (req.status === 401) {
        try {
            const decoded = jwt.verify(token, tokenSecret)
            // Explanation token without validation.
            // jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
            const accessToken = jwt.sign(
                { email: req.email }, tokenSecret, { expiresIn: '5m'}
            )
            const refreshToken = jwt.sign(
                { email: req.email }, tokenSecret, { expiresIn: '30m'}
            )
            req.email = decoded.email
            res.accessToken = accessToken
            res.refreshToken = refreshToken
            next()
        } catch (err) {
            return res.status(403).json({ success: false, message: "Your session has expired. Please log in again."})
        }
    }
}

module.exports = {
    refreshToken
}