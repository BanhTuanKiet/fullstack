const bcrypt = require('bcryptjs')

const password = "TKiet2908"
let hashedPassword
bcrypt.genSalt(10, (err, Salt) => {
    // The bcrypt is used for encrypting password.
    bcrypt.hash(password, Salt, (err, hash) => {
        if (err) {
            return console.log('Cannot encrypt: ', err)
        }
        hashedPassword = hash

        bcrypt.compare(password, hashedPassword,
            async function (err, isMatch) {
                // Comparing the original password to
                // encrypted password
                if (isMatch) {
                    console.log('Encrypted password is: ', password)
                    console.log('Decrypted password is: ', hashedPassword)
                }
                if (!isMatch) {
                    // If password doesn't match the following
                    // message will be sent
                    console.log(hashedPassword + ' is not encryption of ' + password)
                }
            })
    })
})