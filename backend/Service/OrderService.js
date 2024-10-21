const Order = require("../Model/Order")

const createOrder = async (cus_id, shoe_id) => {
    const reslult = await Order.create({
        cus_id: cus_id,
        shoe_id: shoe_id
    })

    if (reslult) {
        return true
    }

    return false
}

module.exports = {
    createOrder
}