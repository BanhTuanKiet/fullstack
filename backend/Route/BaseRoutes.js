const express = require('express')
const baseRoute = express.Router()

const { getItem, getListItem, getItems, getItemsByCompany } = require('../Controller/HomeController')
const { getFavoriteItems } = require('../Controller/FavoritedItemsController')

//base
baseRoute.get('/', getListItem)
baseRoute.get('/:id', getItem)
baseRoute.get('/items/:items', getItems)
baseRoute.get('/favorite/:email', getFavoriteItems)
baseRoute.get('/company/:company', getItemsByCompany)

module.exports = {
    baseRoute
}