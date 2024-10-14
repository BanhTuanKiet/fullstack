const connect = require('../Config/ConfigDb')

const purchaseItem = async (req, res) => {
    const db = await connect()
    const updateQuantitySql = "UPDATE shoes SET quantity = quantity - 1 WHERE name = ? AND quantity > 0"
    const insertTransactionSql = "INSERT INTO transaction (`cus_email`, `shoe_name`) VALUES (?, ?)"

    try {
        const { shoe_name, cus_email } = req.query

        const [resultsUpdate, fieldsUpdate] = await db.query(updateQuantitySql, shoe_name)

        if (resultsUpdate.length <= 0) {
            return res.status(404).json({ success: false, message: "Out of stock or shoe not found." })
        }

        const [resultsInsert, fieldsInsert] = await db.query(insertTransactionSql, [cus_email, shoe_name])

        if (resultsInsert.affectedRows > 0) {

        }

        await db.query(updateQuantitySql, [shoe_name], (errUpdateData, updateData) => {
            if (errUpdateData) {
                return res.status(500).json({ success: false, message: "Error updating shoe quantity." })
            }
            if (updateData.affectedRows > 0) {
                return res.status(200).json({ success: true, message: "Purchase successful.", accessToken: req.accessToken,  refreshToken: req.refreshToken })
            }
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while purchasing the item."})
    }
}

module.exports = {
    purchaseItem
}