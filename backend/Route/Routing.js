const express = require('express')
const router = express.Router()
const routerB = express.Router()
const routerC = express.Router()

const { getItem, getPassword, login, signup, getListItem, getItems, getFavoriteItems, deleteFavoriteItem, postFavoriteItem, getDataByCompany, purchaseItem } = require('../Controller/HomeController')
const { accessToken } = require('../middleware/accessToken')
const { refreshToken } = require('../middleware/refreshToken')
const { encryptionPassword } = require('../middleware/encryption')
const { validation } = require('../Util/validation')

//login
routerB.use(validation)
routerB.post('/', getPassword, encryptionPassword, login)
routerB.post('/signup', signup)
//
router.get('/:id', getItem)
router.get('/', getListItem)
router.get('/items/:items', getItems)
router.get('/favorite/:email', getFavoriteItems)
router.get('/company/:company', getDataByCompany)
//auth
// routerC.use(accessToken)
routerC.delete('/favorite', accessToken, deleteFavoriteItem)
routerC.post('/favorite', accessToken, refreshToken, postFavoriteItem)
routerC.put('/items/purchase',accessToken, refreshToken, purchaseItem)

module.exports = {
    router,
    routerB,
    routerC,
}