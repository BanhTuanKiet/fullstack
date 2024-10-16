require('dotenv').config()
const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
})

// const database =  mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// })

// console.log('Connected to MySQL database.')

try {
    sequelize.authenticate()
    console.log('Connected to MySQL database.')
} catch (error) {
    console.error('Unable to connect to the database:', err)
}

module.exports = sequelize