const e = require('express')
const db = require('../Config/ConfigDb')

const login = (req, res) => {
    const { email, password } = req.body

    const sql = "SELECT name, avatar FROM customer WHERE email = ? AND password = ?"

    db.query(sql, [email, password], (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }
        if (data.length > 0) {
            return res.json({ success: true, message: 'Login successful.', data: data})
        }
        return res.json({ success: false, message: 'Email not exist or password incorret.' })
    })
}

const signup = (req, res) => {
    const { name, email, password } = req.body

    const checkEmailSql = "SELECT * FROM customer WHERE email = ?"

    db.query(checkEmailSql, [email], (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }

        if (data.length > 0) {
            return res.json({ success: false, message: 'Email đã được sử dụng.' })
        }

        const insertSql = "INSERT INTO customer (`email`, `name`, `password`) VALUES (?, ?, ?)";
        
        db.query(insertSql, [email, name, password], (err, data) => {
            if (err) {
                return res.json({ error: 'Internal Server Error.' })
            }
            return res.json({ success: true, message: 'Sign up successfully.' })
        })
    })
}


const getListItem = (req, res) => {
    const sql = "SELECT * FROM shoes"

    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }
        if (data.length > 0) {
            return res.json({ success: true, message: 'Get data successful.', data: data })
        }
        return res.json({ success: false, message: 'Email not exist or password incorret.' })
    })
}

// const getItem = (req, res) => {
//     const name = req.params.shoe

//     const sql = "SELECT * FROM shoes WHERE name = ?"

//     db.query(sql, [name], (err, data) => {
//         if (err) {
//             return res.json({ error: 'Internal Server Error.' })
//         }
//         if (data.length > 0) {
//             return res.json({ success: true, message: 'Get item successful.', data: data})
//         }
//         return res.json({ success: false, message: 'Item not exist.' })
//     })
// }

const getItems = (req, res) => {
    const { items } = req.params   
    const values = `%${items}%`

    const sql = "SELECT * from shoes WHERE name LIKE ?"

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res/json({ error: 'Interal Server Error.' })
        }
        if (data.length > 0) {
            return res.json({ success: true, message: 'Get item successful.', data: data})
        }
        return res.json({ success: false, message: 'Item not exist.' })
    })
}

const getFavoriteItems = (req, res) => {
    const { email } = req.params

    const sql = "SELECT shoe_name FROM favorites WHERE cus_email = ?"

    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }
        console.log(data)
        if (data.length > 0) {
            return res.json({ success: true, data: data })
        }
        return res.json({ success: false })
    })
}

const deleteFavoriteItem = (req, res) => {
    const { email, shoe } = req.query

    const sql = "DELETE FROM favorites WHERE cus_email = ? AND shoe_name = ?"

    db.query(sql, [email, shoe], (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }
        if (data.affectedRows === 0) {
            return res.json( {success: false, message: "No matching records found." })
        }
        return res.json({ success: true, message: "Delete successfully."})
    })
}

const postFavoriteItem = (req, res) => {
    const { email, shoe } = req.body

    const sql = "INSERT INTO favorites (`cus_email`, `shoe_name`) VALUES (?, ?)"

    db.query(sql, [email, shoe], (err, data) => {
        if (err) {
            return res.json({ err: "Error inserting data" })
        }
        return res.json({ success: true, message: "Data inserted successfully" })
    })
}

const getDataByCompany = (req, res) => {
    const { company } = req.params
    console.log(company)
    const sql = "SELECT * from shoes where company = ?"

    db.query(sql, [company], (err, data) => {
        if (err) {
            return res.json({ err: "Error inserting data" })
        }
        if (data.length > 0) {
            return res.json({ success: true, message: "Get shoes with company = ", data: data })
        }
    })
}

const purchaseItem = (req, res) => {
    const { id, name } = req.query

    const sql = "UPDATE shoes SET quantity = 99 WHERE id = ?"

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ err: "Error inserting data" })
        }
        if (data.affectedRows > 0) {
            return res.json({ success: true, message: "Purchased successful.", data })
        }
        return res.json({ success: false, message: "Out of item"})
    })
}

module.exports = {
    login,
    signup,
    getListItem,
    // getItem,
    getItems,
    getFavoriteItems,
    deleteFavoriteItem,
    postFavoriteItem,
    getDataByCompany,
    purchaseItem,
}