require('dotenv').config()
const express = require('express')

const limiter = require('./Config/ConfigRateLimit')
const configCors = require('./Config/ConfigCors')
const configCompress = require('./Config/ConfigCompression')

const { baseRoute } = require('./Route/BaseRoutes')
const { loginRoute } = require('./Route/LoginRoutes')
const { authRoute } = require('./Route/AuthRoutes')
const { verifyOTPRoute } = require('./Route/VerifyRoutes')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')


const port = process.env.PORT

const app = express()
app.use(configCors)
app.use(express.json())
//Invoke-WebRequest -Uri http://localhost:3000/login -Method Get
app.use(configCompress)

app.use(cookieSession({
    name: 'session',
    keys: "abcd",
    maxAge: 60 * 60 * 1000, // 1 hour
    // httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
}))
app.use(cookieParser())
app.use(limiter)
app.use('/', baseRoute)

app.use('/login', loginRoute)
app.use('/login', verifyOTPRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})