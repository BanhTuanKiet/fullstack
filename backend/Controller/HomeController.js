const db = require('../Config/ConfigDb')

const login = (req, res) => {
    const { email, password } = req.body

    const sql = "SELECT * FROM customer WHERE email = ? AND password = ?"

    db.query(sql, [email, password], (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }
        if (data.length > 0) {
            return res.json({ success: true, message: 'Login successful.' })
        } else {
            return res.json({ success: false, message: 'Email not exist or password incorret.' })
        }
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
        } else {
            return res.json({ success: false, message: 'Email not exist or password incorret.' })
        }
    })
}

const getItem = (req, res) => {
    const name = req.params.shoe

    const sql = "SELECT * FROM shoes WHERE name = ?"

    db.query(sql, [name], (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }
        if (data.length > 0) {
            return res.json({ success: true, message: 'Get item successful.', data: data})
        } else {
            return res.json({ success: false, message: 'Item not exist.' })
        }
    })
}

// const getListFavoritedItem = (req, res) => {
//     const email = req.params.email

//     const sql = "SELECT shoe_name FROM favorties WHERE cus_name = ?"

//     db.query(sql, [email], (err, data) => {
//         console.log(data)
//     })
// }

const getFavoriteItems = (req, res) => {
    const email = req.params.email

    const sql = "SELECT shoe_name FROM favorites WHERE cus_name = ?"

    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }
        if (data.length > 0) {
            return res.json({ success: true, data: data })
        } else {
            return res.json({ success: false })
        }
    })
}

// const deleteFavoriteItem = (req, res) => {
//     const email = req.params.email
//     const shoe = req.params.shoe

//     const sql = "DELETE FROM favorites WHERE cus_name = ? AND shoe_name = ?"

//     db.query(sql, [email, shoe], (err, data) => {
//         if (err) {
//             return res.json({ error: 'Internal Server Error.' })
//         }
//         if (data.affectedRows === 0) {
//             return res.json( {success: false, message: "No matching records found." })
//         }
//         return res.json({ success: true, message: "Delete successfully."})
//     })
// }

// const postFavoriteItem = (req, res) => {
//     const { email, shoe } = req.body

//     const sql = "INSERT INTO favorites (`cus_name`, `shoe_name`) VALUES (?, ?)"

//     db.query(sql, [email, shoe], (err, data) => {
//         if (err) {
//             return res.json({ err: "Error inserting data" })
//         }
        
//         return res.json({ success: true, message: "Data inserted successfully" })
//     })
// }

module.exports = {
    login,
    getListItem,
    getItem,
    // getListFavoritedItem,
    getFavoriteItems,
    // deleteFavoriteItem,
    // postFavoriteItem,
}