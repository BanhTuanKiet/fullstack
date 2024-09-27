const jwt = require('jsonwebtoken')

const refreshToken = (req, res, next) => {
    const authorizationClient = req.body.refreshToken
    const token = authorizationClient && authorizationClient
    const { email } = req.query

    if (!token)
        return res.sendStatus(401)

    if (req.status === 200) {
        next()
    }

    if (req.status === 401) {
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            // Explanation token without validation.
            // jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
            const accessToken = jwt.sign(
                { email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m'}
            )
            const refreshToken = jwt.sign(
                { email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m'}
            )
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