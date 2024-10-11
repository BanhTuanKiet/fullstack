const db = require('../Config/ConfigDb')

const getFavoriteItems = (req, res) => {
    try {
        const { email } = req.params

        const sql = `SELECT shoes.id, shoes.name, shoes.star, shoes.price, shoes.img
                    FROM shoes
                    JOIN favorites ON shoes.name = favorites.shoe_name
                    WHERE favorites.cus_email = ?` 
                    
        db.query(sql, [email], (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error occured while getting favorited item.' })
            }
    
            if (data.length > 0) {
                return res.status(200).json({ success: true, data: data })
            }
            return res.status(404).json({ success: false, message: "No matching items found." })
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

const deleteFavoriteItem = (req, res) => {
    try {
        const { email, shoe } = req.query

        const sql = "DELETE FROM favorites WHERE cus_email = ? AND shoe_name = ?"

        db.query(sql, [email, shoe], (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error occured while deleting favorited item.' })
            }
            if (data.affectedRows === 0) {
                return res.status(404).json( {success: false, message: "No matching items found." })
            }

            return res.status(200).json({ success: true, message: "Delete successfully."})
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

const postFavoriteItem = (req, res) => {
    try {
        const { email, shoe } = req.query

        const sql = "INSERT INTO favorites (`cus_email`, `shoe_name`) VALUES (?, ?)"
    
        db.query(sql, [email, shoe], (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Error occured while inserting favorited item." })
            }
            if (data.affectedRows === 0) {
                return res.status(404).json( {success: false, message: "No matching items found." })
            }
            return res.status(200).json({ success: true, message: "Data inserted successfully" })
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "An unexpected error occurred." })
    }
}

module.exports = {
    getFavoriteItems,
    deleteFavoriteItem,
    postFavoriteItem
}