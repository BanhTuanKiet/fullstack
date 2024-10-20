const { where } = require('sequelize')
const Customer = require('../Model/Customer')

const signup = async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body)
    console.log(req.hashedPassword)

    try {
        const resultsSelect = await Customer.findOne({
            where: { email: email },
            attributes: ['id']
        })

        if (resultsSelect) {
            return res.status(200).json({ success: false, message: 'Email exist.' })
        }

        const resultsInsert = await Customer.create({
            email: email,
            name: name,
            password: password,
            encyptionPassword: req.hashedPassword
        })

        if (resultsInsert) {
            return res.status(200).json({ success: true, message: 'Sign up successfully.' })
        }

        return res.status(200).json({ success: true, message: 'Sign up unsuccessfully. Please try again.' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "An error occurred while signuping."})
    }
}

module.exports = {
    signup
}