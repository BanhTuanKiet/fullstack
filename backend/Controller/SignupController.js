const database = require('../Config/ConfigDb')

const signup = async (req, res) => {
    const checkEmailSql = "SELECT * FROM customer WHERE email = ?"
    const insertSql = "INSERT INTO customer (`email`, `name`, `password`) VALUES (?, ?, ?)"

    try {
        const { name, email, password } = req.body

        const [resultsSelect, fieldsSelect] = await database.query(checkEmailSql, [email])

        if (resultsSelect > 0) {
            return res.status(200).json({ success: false, message: 'Email exist.' })
        }

        const [resultsInsert, fieldsInsert] = await database.query(insertSql, [email, name, password])

        if (resultsInsert.affectedRows) {
            return res.status(200).json({ success: true, message: 'Sign up successfully.' })
        }

        return res.status(200).json({ success: true, message: 'Sign up unsuccessfully. Please try again.' })

    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while signuping."})
    }
}

module.exports = {
    signup
}