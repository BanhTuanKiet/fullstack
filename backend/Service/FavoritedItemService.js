const FavoritedItem = require("../Model/FavoritedItem")

const findAllFavoritedItems = async (cus_id) => {
    const favoritedItems = await FavoritedItem.findAll({
        where: { cus_id: cus_id},
        attributes: ['shoe_id'],
        raw: true
    })

    return favoritedItems
}

const addFavoritedItem = async (cus_id, shoe_id) => {
    const result = await FavoritedItem.create({
        cus_id: cus_id,
        shoe_id: shoe_id
    })

    if (result) {
        return true
    }

    return false
}

const deleteFavoriteItem = async (cus_id, shoe_id) => {
    const result = await FavoritedItem.destroy({
        cus_id: cus_id,
        shoe_id: shoe_id
    })

    if (result) {
        return true
    }

    return false
}

module.exports = {
    findAllFavoritedItems,
    addFavoritedItem,
    deleteFavoriteItem
}