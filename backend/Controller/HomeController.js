require('dotenv').config()
const db = require('../Config/ConfigDb')
const jwt = require('jsonwebtoken')
let listItems = []

const getPassword = (req, res, next) => {
    const { email } = req.body

    const sql = "SELECT encyptionPassword FROM customer WHERE email = ?"

    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.json({ message: 'Internal Server Error.' })
        }
        if (data.length > 0) {
            req.hashedPassword = data[0].encyptionPassword
            return next()
        }
        return res.json({ success: false, message: "User unexist." })
    })
}

const login = (req, res) => {
    const { email } = req.body

    const sql = "SELECT name, avatar FROM customer WHERE email = ?"

    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }
        if (data.length > 0) {
//step 1: create token jwt.sign(PayLoad, Secret Key, Options)
//step 2: save token localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
//step 3: get token JSON.parse(localStorage.getItem('accessToken')) and use axios(url, data, CONFIG)
//step 4: check Token authenToken()
            const accessToken = jwt.sign(
                { email: email }, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '1m'}
            )
            return res.json({ success: true, message: 'Login successful.', data: data, accessToken: accessToken })
        }
        return res.json({ success: false, message: 'Email not exist or password incorret.' })
    })
}

const signup = (req, res) => {
    const { name, email, password } = req.body

    const checkEmailSql = "SELECT * FROM customer WHERE email = ?"

    db.query(checkEmailSql, [email], (errCheckEmailSql, dataCheckEmailSql) => {
        if (errCheckEmailSql) {
            return res.json({ error: 'Internal Server Error.' })
        }

        if (dataCheckEmailSql.length > 0) {
            return res.json({ success: false, message: 'Email đã được sử dụng.' })
        }

        const insertSql = "INSERT INTO customer (`email`, `name`, `password`) VALUES (?, ?, ?)";
        
        db.query(insertSql, [email, name, password], (errInsertSql, dataInsertSql) => {
            if (errInsertSql) {
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
            listItems = data
            return res.json({ success: true, message: 'Get data successful.', data: data })
        }
        return res.json({ success: false, message: 'Email not exist or password incorret.' })
    })
}

const getItems = (req, res) => {
    // console.time("Time excute: ")
    const { items } = req.params

    const arrItems = listItems.filter(item => item.name.toLowerCase().includes(items.toLowerCase().trim()))

    if (arrItems.length > 0) {
        // console.timeEnd("Time excute: ")
        return res.json({ success: true, message: 'Get item successful.', data: arrItems })
    }
    // console.timeEnd("Time excute: ")
    return res.json({ success: false, message: 'Item not exist.' })
}


const getFavoriteItems = (req, res) => {
    const { email } = req.params

    const sql = "SELECT shoe_name FROM favorites WHERE cus_email = ?"

    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.json({ error: 'Internal Server Error.' })
        }
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
    // console.time("Time excute: ")
    const { company } = req.params

    const arrItems = listItems.filter(item => item.company === company)

    if (arrItems.length > 0) {
        // console.timeEnd("Time excute: ")
        return res.json({ success: true, message: `Get shoes with company = ${company}`, data: arrItems })
    }
    // console.timeEnd("Time excute: ")
    return res.json({ success: false, message: "No shoes found for the given company." })
}

const purchaseItem = (req, res) => {
    const { shoe_name, cus_email } = req.query

    const updateQuantitySql = "UPDATE shoes SET quantity = quantity - 1 WHERE name = ? AND quantity > 0"

    db.query(updateQuantitySql, [shoe_name], (errUpdateData, updateData) => {
        if (errUpdateData) {
            return res.json({ err: "Error updating shoe quantity" })
        }
        if (updateData.affectedRows > 0) {
            const insertTransactionSql = "INSERT INTO transaction (`cus_email`, `shoe_name`) VALUES (?, ?)"
            
            db.query(insertTransactionSql, [cus_email, shoe_name], (errInsertTransactionSql, dataInsertTransactionSql) => {
                if (errInsertTransactionSql) {
                    return res.json({ err: "Error insert transaction data" })
                }
                return res.json({ success: true, message: "Purchase successful." })
            })
        }
        else {
            return res.json({ success: false, message: "Out of stock or shoe not found" })
        }
    })
}

module.exports = {
    getPassword,
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