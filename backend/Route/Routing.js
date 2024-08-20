const express = require('express')
const router = express.Router()
const { login, getListItem, getItem, getFavoriteItems } = require('../Controller/HomeController')

router.post('/login', login)

router.get('/', getListItem)

router.get('/:shoe', getItem)

// router.get('/:email', getListFavoritedItem)

router.get('/item/:email', getFavoriteItems)

// router.delete('/:email/:shoe', deleteFavoriteItem)

// router.post('/', postFavoriteItem)

module.exports = router