const connect = require('../Config/ConfigDb')

const getFavoriteItems = async (req, res) => {
    const db = await connect()
    const sql = `SELECT shoes.id, shoes.name, shoes.star, shoes.price, shoes.img
                FROM shoes
                JOIN favorites ON shoes.name = favorites.shoe_name
                WHERE favorites.cus_email = ?` 

    try {
        const { email } = req.params

        const [results, fields] = await db.query(sql, [email])

        if (results.length > 0) {
            return res.status(200).json({ success: true, data: results })
        }
        return res.status(404).json({ success: false, message: "No matching items found." })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

const deleteFavoriteItem = async (req, res) => {
    const db = await connect()
    const sql = "DELETE FROM favorites WHERE cus_email = ? AND shoe_name = ?"

    try {
        const { email, shoe } = req.query

        const [results, fields] = await db.query(sql, [email, shoe])

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "No matching items found." })
        }
        return res.status(200).json({ success: true, message: "Delete successfully."})
    } catch (error) {
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

const postFavoriteItem = async (req, res) => {
    const db = await connect()
    const sql = "INSERT INTO favorites (`cus_email`, `shoe_name`) VALUES (?, ?)"

    try {
        const { email, shoe } = req.query

        const [results, fields] = await db.query(sql, [email, shoe])

        if (results.affectedRows === 0) {
            return res.status(404).json( {success: false, message: "No matching items found." })
        }
        return res.status(200).json({ success: true, message: "Data inserted successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

module.exports = {
    getFavoriteItems,
    deleteFavoriteItem,
    postFavoriteItem
}