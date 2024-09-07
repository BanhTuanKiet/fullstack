const bcrypt = require('bcryptjs')

const encryptionPassword = (req, res, next) => {
    const { password } = req.body
    const hashedPassword = req.hashedPassword

    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
            console.error('Error comparing passwords:', err)
            return res.status(500).json({ message: 'Internal Server Error.' })
        }

        if (isMatch) {
            console.log("HasedPassword: ", hashedPassword)
            console.log("Password: ", password)
            console.log('Password is correct.')
            next()
        } else {
            console.log('Password is incorrect.') 
        }
    })
// })
// })
}

module.exports = {
    encryptionPassword
}
