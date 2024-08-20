const mysql = require('mysql')

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoes'   
})

database.connect((err) => {
    err ? console.log('Error connecting to MySQL database: ', err , '.') : console.log('Connected to MySQL database.')
})

module.exports = database