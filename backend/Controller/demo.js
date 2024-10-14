const getListItem = async (req, res) => {
    const db = await connect()
    const sql = "SELECT * FROM shoes"

    try {
        const [results, fields] = await db.query(sql)

        if (results.length > 0) {
            listItems = results
            return res.status(200).json({ success: true, message: 'Get items successful.', data: results })
        }
        return res.status(404).json({ success: false, message: 'No items found in database.' })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Database error."})
    }
}
