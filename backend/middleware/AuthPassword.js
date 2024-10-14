const bcrypt = require('bcryptjs')

const AuthPassword = async (req, res, next) => {
    const { password } = req.body
    const hashedPassword = req.hashedPassword

    try {
        const isMatch = await bcrypt.compare(password, hashedPassword)

        if (isMatch) {
            return next()
        }
        return res.status(401).json({ success: false, message: "Password is not correct!" }) 
    } catch (error) {
        console.error('Error comparing passwords:', err)
        return res.status(500).json({ success: false, message: 'Error occurred while comparing the password.' })
    }
}

module.exports = {
    AuthPassword
}
