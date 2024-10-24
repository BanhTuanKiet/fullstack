const { findIdCusByEmail } = require('../Service/CustomerService')
const { addFavoritedItem, deleteFavoritedItem, findAllFavoritedItems } = require('../Service/FavoritedItemService')

const getFavoriteItems = async (req, res) => {
    try {
        const cus_id = await findIdCusByEmail(req.email)

        if (!cus_id) {
            return res.status(200).json({ success: false, message: "User not found." })
        }

        const results = await findAllFavoritedItems(cus_id.id)

        if (results.length > 0) {
            return res.status(200).json({ success: true, data: results })
        }

        return res.status(404).json({ success: false, message: "No matching items found." })

    } catch (error) {
        console.log("Get favorited items: ", error)
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

const deleteFavoriteItem = async (req, res) => {
    try {
        const { shoe_id } = req.query

        const cus_id = await findIdCusByEmail(req.email)

        if (!cus_id) {
            return res.status(200).json({ success: false, message: "User not found." })
        }

        const result = await deleteFavoritedItem(cus_id.id, shoe_id)

        if (result) {
            return res.status(200).json({ success: true, message: "Delete successfully."})
        }

        return res.status(200).json({ success: false, message: "No matching items found." })
        
    } catch (error) {
        console.log("Delete favorited item: ", error)
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

const postFavoriteItem = async (req, res) => {
    try {
        const { shoe_id } = req.query

        const cus_id = await findIdCusByEmail(req.email)

        if (!cus_id) {
            return res.status(200).json({ success: false, message: "User not found." })
        }

        const result = await addFavoritedItem(cus_id.id, shoe_id)

        if (result) {
            return res.status(200).json({ success: true, message: "Data inserted successfully." })
        }
    
    } catch (error) {
        console.log("Insert favorited item: ", error)
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

module.exports = {
    getFavoriteItems,
    deleteFavoriteItem,
    postFavoriteItem
}