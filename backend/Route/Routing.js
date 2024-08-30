const express = require('express')
const router = express.Router()
const { login, signup, getListItem, getItems, getFavoriteItems, deleteFavoriteItem, postFavoriteItem, getDataByCompany, purchaseItem } = require('../Controller/HomeController')
const { authenToken } = require('../middleware/authenToken')

router.post('/login', login)

router.post('/signup', signup)

router.get('/', getListItem)

// router.get('/:shoe', getItem)

router.get('/items/:items', getItems)

router.get('/favorite/:email', getFavoriteItems)

router.delete('/favorite', deleteFavoriteItem)

router.post('/favorite', postFavoriteItem)

router.get('/company/:company', getDataByCompany)

router.put('/items/purchase', authenToken, purchaseItem)

module.exports = router