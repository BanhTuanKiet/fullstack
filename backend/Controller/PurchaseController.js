const { findIdCusByEmail } = require('../Service/CustomerService')
const { createOrder } = require('../Service/OrderService')
const { updateQuantity } = require('../Service/ShoeService')

const purchaseItem = async (req, res) => {
    const { shoe_id } = req.query
    const email = req.email

    try {
        const cus_id = await findIdCusByEmail(email)

        if (!cus_id) {
            return res.status(200).json({ success: false, message: "User not found." })
        }

        const resultUpdate = await updateQuantity(shoe_id)

        if (!resultUpdate) {
            return res.status(200).json({ success: false, message: "Out of stock or shoe not found." })
        }

        const resultInsert = await createOrder(cus_id.id, shoe_id)

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