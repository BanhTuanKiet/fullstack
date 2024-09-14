const express = require('express')
const router = express.Router()
const routerB = express.Router()
const { getNewToken, getItem, getPassword, login, signup, getListItem, getItems, getFavoriteItems, deleteFavoriteItem, postFavoriteItem, getDataByCompany, purchaseItem } = require('../Controller/HomeController')
const { authenToken } = require('../middleware/authenToken')
const { encryptionPassword } = require('../middleware/encryption')

router.get('/:id', getItem)
router.post('/login', getPassword, encryptionPassword, login)
router.post('/signup', signup)
router.get('/', getListItem)
router.get('/items/:items', getItems)
router.get('/favorite/:email', getFavoriteItems)
router.get('/company/:company', getDataByCompany)

router.delete('/favorite', deleteFavoriteItem)
router.post('/favorite', postFavoriteItem)


router.post('/token/authenToken', authenToken)

router.post('/token/refreshToken', getNewToken)

router.put('/items/purchase', purchaseItem)

module.exports = {
    router,
    routerB
}