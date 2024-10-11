const db = require('../Config/ConfigDb')

const signup = (req, res) => {
    const { name, email, password } = req.body

    const checkEmailSql = "SELECT * FROM customer WHERE email = ?"

    db.query(checkEmailSql, [email], (errCheckEmailSql, dataCheckEmailSql) => {
        if (errCheckEmailSql) {
            return res.status(500).json({ success: false, message: 'Error occured while checking email.' })
        }

        if (dataCheckEmailSql.length > 0) {
            return res.status(400).json({ success: false, message: 'Email exist.' })
        }

        const insertSql = "INSERT INTO customer (`email`, `name`, `password`) VALUES (?, ?, ?)";
        
        db.query(insertSql, [email, name, password], (errInsertSql, dataInsertSql) => {
            if (errInsertSql) {
                return res.status(500).json({ success: false, message: 'Error occured while inserting email.' })
            }
            return res.status(200).json({ success: true, message: 'Sign up successfully.' })
        })
    })
}

module.exports = {
    signup
}