const bcrypt = require('bcryptjs')

const EncryptionPassword = (req, res, next) => {
    const { password }  = req.body

    bcrypt.genSalt(10, (errGenSalt, Salt) => {
        if (errGenSalt) {
            return res.status(500).json({ success: false, message: "An error occurred while encryting password."})
        }

        bcrypt.hash(password, Salt, (errHash, hash) => {
            if (errHash) {
                return res.status(500).json({ success: false, message: "An error occurred while encryting password."})
            }
            
            req.hashedPassword = hash
            next()
        })
    })
}

module.exports = { 
    EncryptionPassword 
}