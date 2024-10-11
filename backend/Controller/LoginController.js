const db = require('../Config/ConfigDb')
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET
const { createOTP } = require('../middleware/createOTP')

const getPassword = (req, res, next) => {
    try {
        const { email } = req.body

        const sql = "SELECT encyptionPassword FROM customer WHERE email = ?"
    
        db.query(sql, [email], (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Internal Server Error.' })
            }
            if (data.length > 0) {
                req.hashedPassword = data[0].encyptionPassword
                return next()
            }
            return res.status(404).json({ success: false, message: "User unexist." })
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred while getting password.' })
    }
}

const login = async (req, res) => {
    try {
        const { email } = req.body

        const sql = "SELECT name, avatar FROM customer WHERE email = ?"
    
        await db.query(sql, [email], (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Internal Server Error.' })
            }
            if (data.length > 0) {
    //step 1: create token jwt.sign(PayLoad, Secret Key, Options)
    //step 2: save token localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
    //step 3: get token JSON.parse(localStorage.getItem('accessToken')) and use axios(url, data, CONFIG)
    //step 4: check Token authenToken()
                const token = createOTP(JSON.stringify(email))

                const accessToken = jwt.sign(
                    { email: email }, tokenSecret, { expiresIn: '1m'}
                )
                const refreshToken = jwt.sign(
                    { email: email }, tokenSecret, { expiresIn: '2m'}
                )
    
                return res.json({ 
                    success: true, message: 'Login successful.', data: data, 
                    accessToken: accessToken, refreshToken: refreshToken, 
                    otp: token
                })
            }
            return res.status(404).json({ success: false, message: 'Email not exist or password incorret.' })
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred while login.' })
    }
}

module.exports = {
    getPassword,
    login
}