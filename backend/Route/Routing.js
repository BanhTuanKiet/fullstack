const express = require('express')
const router = express.Router()
const routerB = express.Router()
const routerAuth = express.Router()

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
routerAuth.use(accessToken)
routerAuth.delete('/favorite', deleteFavoriteItem)
routerAuth.post('/favorite', refreshToken, postFavoriteItem)
routerAuth.put('/items/purchase', refreshToken, purchaseItem)

module.exports = {
    router,
    routerB,
    routerAuth,
}