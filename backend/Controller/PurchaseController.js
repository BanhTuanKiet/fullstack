const db = require('../Config/ConfigDb')

const purchaseItem = async (req, res) => {
    try {
        const { shoe_name, cus_email } = req.query

        const updateQuantitySql = "UPDATE shoes SET quantity = quantity - 1 WHERE name = ? AND quantity > 0"
    
        await db.query(updateQuantitySql, [shoe_name], (errUpdateData, updateData) => {
            if (errUpdateData) {
                return res.status(500).json({ success: false, message: "Error updating shoe quantity." })
            }
            if (updateData.affectedRows > 0) {
                const insertTransactionSql = "INSERT INTO transaction (`cus_email`, `shoe_name`) VALUES (?, ?)"
                
                db.query(insertTransactionSql, [cus_email, shoe_name], (errInsertTransactionSql, dataInsertTransactionSql) => {
                    if (errInsertTransactionSql) {
                        return res.status(500).json({ err: "Error insert transaction data." })
                    }
                    return res.status(200).json({ success: true, message: "Purchase successful.", accessToken: req.accessToken,  refreshToken: req.refreshToken })
                })
            }
            return res.status(404).json({ success: false, message: "Out of stock or shoe not found." })
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while purchasing the item."})
    }
}

module.exports = {
    purchaseItem
}