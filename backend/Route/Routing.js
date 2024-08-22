const express = require('express')
const router = express.Router()
const { login, signup, getListItem, getItem, getFavoriteItems, deleteFavoriteItem, postFavoriteItem } = require('../Controller/HomeController')

router.post('/login', login)

router.post('/signup', signup)

router.get('/', getListItem)

router.get('/:shoe', getItem)

// router.get('/:email', getListFavoritedItem)

router.get('/favorite/:name', getFavoriteItems)

router.delete('/favorite', deleteFavoriteItem)

router.post('/favorite', postFavoriteItem)

module.exports = router