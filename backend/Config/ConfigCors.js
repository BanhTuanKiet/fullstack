require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT
const port_FE = process.env.PORT_FE

const corsOptions = {
    origin: [`http://localhost:${port}`, `http://localhost:${port_FE}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
}

const configCors = cors(corsOptions)

module.exports = configCors