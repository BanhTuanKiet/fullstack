const express = require('express')
const authRoute = express.Router()

const { accessToken } = require('../middleware/accessToken')
const { refreshToken } = require('../middleware/refreshToken')
const { deleteFavoriteItem, postFavoriteItem, getFavoriteItems } = require('../Controller/FavoritedItemsController')
const { purchaseItem } = require('../Controller/PurchaseController')

//auth
authRoute.get('/favorite', accessToken, getFavoriteItems)
authRoute.delete('/favorite', accessToken, deleteFavoriteItem)
authRoute.post('/favorite', accessToken, postFavoriteItem)
authRoute.put('/items/purchase', accessToken, purchaseItem)

module.exports = {
    authRoute
}