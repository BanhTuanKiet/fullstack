const { findIdCusByEmail, createCustomer } = require('../Service/CustomerService')

const signup = async (req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = req.hashedPassword

    try {
        const resultsSelect = await findIdCusByEmail(email)

        if (resultsSelect) {
            return res.status(200).json({ success: false, message: 'Email exist.' })
        }

        const resultsInsert = await createCustomer(email, name, password, hashedPassword)

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