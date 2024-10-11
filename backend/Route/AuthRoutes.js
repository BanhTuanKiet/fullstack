const express = require('express')
const authRoute = express.Router()

const { accessToken } = require('../middleware/accessToken')
const { refreshToken } = require('../middleware/refreshToken')
const { deleteFavoriteItem, postFavoriteItem } = require('../Controller/FavoritedItemsController')
const { purchaseItem } = require('../Controller/PurchaseController')

//auth
authRoute.use(accessToken)
authRoute.delete('/favorite', deleteFavoriteItem)
authRoute.post('/favorite', postFavoriteItem)
authRoute.put('/items/purchase', refreshToken, purchaseItem)

module.exports = {
    authRoute
}