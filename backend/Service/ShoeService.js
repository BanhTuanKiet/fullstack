const { Sequelize } = require('sequelize')
const Shoe = require('../Model/Shoe')

let listItems

const getAllShoes = async () => {
    listItems = await Shoe.findAll({
        attributes: ['id', 'name', 'star', 'price', 'company', 'color', 'category', 'quantity', 'img']
    })

    return listItems
}

const getShoeById = (id) => {
    if (!listItems) {
        return false
    }

    return listItems.filter(i => i.id === id)
}

const getShoesByName = (shoe_name) => {
    if (!listItems) {
        return false
    }

    return listItems.filter(item => item.name.toLowerCase().includes(shoe_name.toLowerCase().trim()))
}

const getShoesByCompany = (company) => {
    if (!listItems) {
        return false
    }
    
    return listItems.filter(item => item.company === company)
}

const updateQuantity = async (shoe_id) => {
    const result = Shoe.update({ quantity: Sequelize.literal('quantity - 1') }, {
        where: { 
            id: shoe_id,
            quantity: { [Sequelize.Op.gt]: 0 }
        }
    })

    if (result) {
        return true
    }

    return false
}

module.exports = {
    getAllShoes,
    getShoeById,
    getShoesByName,
    getShoesByCompany,
    updateQuantity
}