const express = require('express')
const cors = require('cors')
const { router, routerB, routerC } = require('./Route/Routing')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', router)
app.use('/login', routerB)
app.use('/auth', routerC)

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})