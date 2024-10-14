require('dotenv').config()
const mysql = require('mysql2/promise')

const connect = async () => {
    try {
        const database = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })
        console.log('Connected to MySQL database.')
        return database
    } catch (error) {
        console.log(error)
    }
}

module.exports = connect