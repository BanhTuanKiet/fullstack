const { where } = require('sequelize')
const Customer = require('../Model/Customer')
const FavoritedItem = require('../Model/FavoritedItem')
const Shoe = require('../Model/Shoe')

const getFavoriteItems = async (req, res) => {
    try {
        const { email } = req.params

        const results = await Shoe.findAll({
            include: [{
                model: FavoritedItem,
                where: { cus_email: email},
                attributes: []
            }],
            attributes: ['id', 'name', 'star', 'price', 'img'],
            raw: true
        })
        console.log(results)
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
        const { email, shoe } = req.query

        const result = await FavoritedItem.destroy({
            where: {
                cus_email: email,
                shoe_name: shoe
            }
        })
        console.log(result)
        if (result) {
            return res.status(200).json({ success: true, message: "Delete successfully."})
        }
        return res.status(404).json({ success: false, message: "No matching items found." })
        
    } catch (error) {
        console.log("Delete favorited item: ", error)
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

const postFavoriteItem = async (req, res) => {
    try {
        const { email, shoe } = req.query

        const cus_id = await Customer.findOne({
            where: { email: email },
            attributes: ['id']
        })

        if (!cus_id) {
            return res.status(200).json({ success: false, message: "User not found." })
        }

        await FavoritedItem.create({
            cus_id: cus_id.id,
            shoe_id: shoe
        })

        return res.status(200).json({ success: true, message: "Data inserted successfully." })
    
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