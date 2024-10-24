require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT
const port_FE = process.env.PORT_FE

const corsOptions = {
    origin: [
        // `http://localhost:${port}`, 
        `http://localhost:${port_FE}`,
        // `http://localhost:${port}/login`, 
        `http://localhost:${port_FE}/login`,
    ],
    // origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    credentials: true
}

const configCors = cors(corsOptions)

module.exports = configCors