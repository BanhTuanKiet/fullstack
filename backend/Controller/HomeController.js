require('dotenv').config()
const db = require('../Config/ConfigDb')
const jwt = require('jsonwebtoken')

const tokenSecret = process.env.TOKEN_SECRET
let listItems = []

const getItem = (req, res) => {
    const { id } = req.params
    const parsedId = Number(id)
    const item = listItems.filter(i => i.id === parsedId)

    return res.json({ success: true, message: "Get item.", data: item })
}

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
                { email: email }, tokenSecret, { expiresIn: '1m'}
            )
            const refreshToken = jwt.sign(
                { email: email }, tokenSecret, { expiresIn: '2m'}
            )

            return res.json({ 
                success: true, message: 'Login successful.', data: data, 
                accessToken: accessToken, refreshToken: refreshToken, 
                // accessTokenExpiry: accessTokenExpiry, refreshTokenExpiry: refreshTokenExpiry 
            })
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

    const sql = `SELECT shoes.id, shoes.name, shoes.star, shoes.price, shoes.img
                FROM shoes
                JOIN favorites ON shoes.name = favorites.shoe_name
                WHERE favorites.cus_email = ?` 
                
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
        console.log("Data affectedRows: ", data)
        return res.json({ success: true, message: "Delete successfully."})
    })
}

const postFavoriteItem = (req, res) => {
    const { email, shoe } = req.query
    console.log("post")
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
                return res.json({ success: true, message: "Purchase successful.", accessToken: req.accessToken,  refreshToken: req.refreshToken })
            })
        }
        else {
            return res.json({ success: false, message: "Out of stock or shoe not found" })
        }
    })
}

module.exports = {
    getItem,
    getPassword,
    login,
    signup,
    getListItem,
    getItems,
    getFavoriteItems,
    deleteFavoriteItem,
    postFavoriteItem,
    getDataByCompany,
    purchaseItem,
}