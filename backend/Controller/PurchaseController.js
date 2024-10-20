const { where, Sequelize } = require('sequelize')
const database = require('../Config/ConfigDb')
const Customer = require('../Model/Customer')
const Shoe = require('../Model/Shoe')
const Order = require('../Model/Order')

const purchaseItem = async (req, res) => {
    const { shoe_id, cus_email } = req.query

    try {
        const cus_id = await Customer.findOne({
            where: { email: cus_email },
            attributes: ['id']
        })

        if (!cus_id) {
            return res.status(200).json({ success: false, message: "User not found." })
        }

        const resultUpdate = await Shoe.update({ quantity: Sequelize.literal('quantity - 1') },
            {
                where: { 
                    id: shoe_id,
                    quantity: { [Sequelize.Op.gt]: 0 }
                }
            }
        )

        if (!resultUpdate) {
            return res.status(200).json({ success: false, message: "Out of stock or shoe not found." })
        }

        const resultInsert = await Order.create({
            cus_id: cus_id.id,
            shoe_id: shoe_id
        })

        if (resultInsert) {
            return res.status(200).json({ success: true, message: "Purchase successful.", accessToken: req.accessToken,  refreshToken: req.refreshToken })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "An error occurred while purchasing the item."})
    }
}

module.exports = {
    purchaseItem
}