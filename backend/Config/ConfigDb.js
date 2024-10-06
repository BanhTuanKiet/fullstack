require('dotenv').config()
const mysql = require('mysql')

const database = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

database.connect((err) => {
    err ? console.log('Error connecting to MySQL database: ', err , '.') : console.log('Connected to MySQL database.')
})

module.exports = database