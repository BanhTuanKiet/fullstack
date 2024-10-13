const bcrypt = require('bcryptjs')

const AuthPassword = (req, res, next) => {
    const { password } = req.body
    const hashedPassword = req.hashedPassword

    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
            console.error('Error comparing passwords:', err)
            return res.status(500).json({ success: false, message: 'Error occurred while comparing the password.' })
        }

        if (isMatch) {
            next()
        } else {
            return res.status(401).json({ success: false, message: "Password is not correct!" }) 
        }
    })
}

module.exports = {
    AuthPassword
}
