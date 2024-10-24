const jwt = require('jsonwebtoken')
const { GenerateOTP } = require('../middleware/GenerateOTP')
const { findEnPassCusByEmail, findIn4CusByEmail } = require('../Service/CustomerService')

const getPassword = async (req, res, next) => {
    const { email } = req.body
    
    try {
        const result = await findEnPassCusByEmail(email)

        if (!result) {
            return res.status(200).json({ success: false, message: 'User not found.' })
        }

        req.hashedPassword = result.encyptionPassword
        return next()

    } catch (error) {
        console.log("Get password error: ", error)
        return res.status(500).json({ success: false, message: 'An error occurred while getting password.' })
    }
}

const login = async (req, res) => {
    const { email } = req.body

    try {
        const result = await findIn4CusByEmail(email)

        if (result) {
            const stateVerify = GenerateOTP(JSON.stringify(email))

            if (!stateVerify) {
                return res.status(200).json({ success: false, message: 'Error generating OTP. Please try again later.' })
            }
// //step 1: create token jwt.sign(PayLoad, Secret Key, Options)
// //step 2: save token localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
// //step 3: get token JSON.parse(localStorage.getItem('accessToken')) and use axios(url, data, CONFIG)
// //step 4: check Token authenToken()
            const accessToken = jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: '5m'})
            const refreshToken = jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: '30m'})

            res.cookie('token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000, //1 hour
            })

            return res.json({ success: true, message: 'Login successful.', data: result, accessToken: accessToken, refreshToken: refreshToken })
        }  
        
        return res.status(200).json({ success: false, message: 'Email not exist or password incorret.' })

    } catch (error) {
        console.log("Login error: ", error)
        return res.status(500).json({ success: false, message: 'An error occurred while login.' })
    }
}

module.exports = {
    getPassword,
    login
}