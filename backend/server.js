require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { baseRoute } = require('./Route/BaseRoutes')
const { loginRoute } = require('./Route/LoginRoutes')
const { authRoute } = require('./Route/AuthRoutes')
const { verifyOTPRoute } = require('./Route/VerifyRoutes')
const limiter = require('./middleware/RateLimit ')

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.use(limiter)
app.use('/', baseRoute)

app.use('/login', loginRoute)
app.use('/login', verifyOTPRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})