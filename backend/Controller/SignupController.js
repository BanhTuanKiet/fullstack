const connect = require('../Config/ConfigDb')

const signup = async (req, res) => {
    const db = await connect()
    const checkEmailSql = "SELECT * FROM customer WHERE email = ?"
    const insertSql = "INSERT INTO customer (`email`, `name`, `password`) VALUES (?, ?, ?)"

    try {
        const { name, email, password } = req.body

        const [resultsSelect, fieldsSelect] = await db.query(checkEmailSql, [email])

        if (resultsSelect > 0) {
            return res.status(400).json({ success: false, message: 'Email exist.' })
        }

        const [resultsInsert, fieldsInsert] = await db.query(checkEmailSql, [email, name, password])

        if (resultsInsert.affectedRows) {
            return res.status(200).json({ success: true, message: 'Sign up successfully.' })
        }

        return res.status(404).json({ success: true, message: 'Sign up unsuccessfully. Please try again.' })

    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while signuping."})
    }
}

module.exports = {
    signup
}