require('dotenv').config()
const mysql = require('mysql2/promise')

const database =  mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

console.log('Connected to MySQL database.')

module.exports = database