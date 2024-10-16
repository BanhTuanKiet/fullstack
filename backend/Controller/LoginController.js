const database = require('../Config/ConfigDb')
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET
const { GenerateOTP } = require('../middleware/GenerateOTP')
const Customer = require('../Model/Customer')
const { where } = require('sequelize')

const getPassword = async (req, res, next) => {
    const sql = "SELECT encyptionPassword FROM customer WHERE email = ?"

    try {
        const { email } = req.body

        const [results, fields] = await database.query(sql, [email])

        if (results.length > 0) {
            req.hashedPassword = results[0].encyptionPassword
            return next()
        }
    } catch (error) {
        console.log("Get password error: ", error)
        return res.status(500).json({ success: false, message: 'An error occurred while getting password.' })
    }
}

const login = async (req, res) => {
    const { email } = req.body
    // const sql = "SELECT name, avatar FROM customer WHERE email = ?"

    try {
        const result = await Customer.findOne({
            where: {
                email: email
            },
            attributes: ['name', 'avatar'] 
        })
        console.log(result.dataValues)
        if (result) {
// //step 1: create token jwt.sign(PayLoad, Secret Key, Options)
// //step 2: save token localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
// //step 3: get token JSON.parse(localStorage.getItem('accessToken')) and use axios(url, data, CONFIG)
// //step 4: check Token authenToken()
            const stateVerify = GenerateOTP(JSON.stringify(email))

            if (!stateVerify) {
                return res.status(200).json({ success: false, message: 'Error generating OTP. Please try again later.' })
            }

            const accessToken = jwt.sign({ email: email }, tokenSecret, { expiresIn: '1m'})
            const refreshToken = jwt.sign({ email: email }, tokenSecret, { expiresIn: '2m'})

            return res.json({ 
                success: true, message: 'Login successful.', data: result.dataValues, accessToken: accessToken, refreshToken: refreshToken, 
            })
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