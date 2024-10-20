const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    window: 60 * 1000, // 1 minute
    max: 100,
    message: "Too many requests from this IP, please try again later.",
    standarHeaders: true,
    legacyHeaders: true
})

module.exports = limiter