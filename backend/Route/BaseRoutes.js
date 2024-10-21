const express = require('express')
const baseRoute = express.Router()

const { getItem, getListItem, getItems, getItemsByCompany } = require('../Controller/HomeController')

//base
baseRoute.get('/', getListItem)
baseRoute.get('/:id', getItem)
baseRoute.get('/items/:shoe_name', getItems)
baseRoute.get('/company/:company', getItemsByCompany)

module.exports = {
    baseRoute
}