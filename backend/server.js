require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { router, routerB, routerAuth } = require('./Route/Routing')

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', router)
app.use('/login', routerB)
app.use('/auth', routerAuth)

app.listen(port, () => {
    console.log(`http://localhost:3000`)
})