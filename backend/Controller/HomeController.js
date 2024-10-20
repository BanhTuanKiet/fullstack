require('dotenv').config()
const Shoe = require('../Model/Shoe')
let listItems = []

const getItem = (req, res) => {
    try {
        const { id } = req.params
        const parsedId = Number(id)
        
        if (isNaN(parsedId)) {
            return res.status(200).json({ success: false, message: "Invalid item ID." })
        }

        if (!listItems) {
            return res.status(200).json({ success: false, message: "Items list not available." })
        }
        const item = listItems.filter(i => i.id === parsedId)
        
        if (item) {
            return res.status(200).json({ success: true, message: "Get items.", data: item })
        }
        return res.status(200).json({ success:false, message: `No items found with ID: ${parsedId}.` })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while fetching the items."})
    }
    
}

const getListItem = async (req, res) => {
    console.time("Time excute: ")

    try {
        const results = await Shoe.findAll({
            attributes: ['id', 'name', 'star', 'price', 'company', 'color', 'category', 'quantity', 'img']
        })

        if (results.length > 0) {
            console.timeEnd("Time excute: ")
            listItems = results
            return res.status(200).json({ success: true, message: 'Get items successful.', data: results })
        }

        console.timeEnd("Time excute: ")
        return res.status(200).json({ success: false, message: 'No items found in database.' })
    
    } catch (error) {
        console.log("get list items: ", error)
        return res.status(500).json({ success: false, message: "Database error."})
    }
}

const getItems = (req, res) => {
    try {
        const { items } = req.params

        if (!listItems) {
            return res.status(500).json({ success: false, message: "Internal server error. Items list not available." })
        }

        const arrItems = listItems.filter(item => item.name.toLowerCase().includes(items.toLowerCase().trim()))

        if (arrItems.length > 0) {
            return res.status(200).json({ success: true, message: 'Get items successful.', data: arrItems })
        }

        return res.status(200).json({ success: false, message: `No items found with name: ${items}.` })
    
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while fetching the items."})
    }
}

const getItemsByCompany = (req, res) => {
    // console.time("Time excute: ")
    try {
        const { company } = req.params

        if (!listItems) {
            // console.timeEnd("Time excute: ")
            return res.status(500).json({ success: false, message: "Internal server error. Items list not available." })
        }

        const arrItems = listItems.filter(item => item.company === company)
    
        if (arrItems.length > 0) {
            // console.timeEnd("Time excute: ")
            return res.status(200).json({ success: true, message: `Get shoes with company = ${company}`, data: arrItems })
        }
        // console.timeEnd("Time excute: ")
        return res.status(200).json({ success: false, message: `No itmes found with company: ${company}.` })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while fetching the items."})
    }
}

module.exports = {
    getItem,
    getListItem,
    getItems,
    getItemsByCompany,
}