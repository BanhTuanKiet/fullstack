const express = require('express')
const router = express.Router()
const routerB = express.Router()
const { getItem, getPassword, login, signup, getListItem, getItems, getFavoriteItems, deleteFavoriteItem, postFavoriteItem, getDataByCompany, purchaseItem } = require('../Controller/HomeController')
const { accessToken } = require('../middleware/accessToken')
const { refreshToken } = require('../middleware/refreshToken')
const { encryptionPassword } = require('../middleware/encryption')
const { validation } = require('../Util/validation')

router.get('/:id', getItem)
router.post('/login', validation, getPassword, encryptionPassword, login)
router.post('/signup', signup)
router.get('/', getListItem)
router.get('/items/:items', getItems)
router.get('/favorite/:email', getFavoriteItems)
router.get('/company/:company', getDataByCompany)

router.delete('/favorite', deleteFavoriteItem)
router.post('/favorite', postFavoriteItem)


router.post('/token/authenToken', accessToken)

// router.post('/token/refreshToken', getNewToken)

// routerB.use(accessToken)

router.put('/items/purchase', accessToken, refreshToken, purchaseItem)

module.exports = {
    router,
    routerB
}