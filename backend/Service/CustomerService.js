const Customer = require("../Model/Customer")

const findIdCusByEmail = async (email) => {
    return await Customer.findOne({
        where: { email: email },
        attributes: ['id']
    })
}

const findEnPassCusByEmail = async (email) => {
    return await Customer.findOne({
        where: { email: email },
        attributes: ['encyptionPassword']
    })
}

const findIn4CusByEmail = async (email) => {
    return await Customer.findOne({
        where: { email: email },
        attributes: ['name', 'avatar'] 
    })
}

const createCustomer = async (email, name, password, hashedPassword) => {
    const result = Customer.create({
        email: email,
        name: name,
        password: password,
        encyptionPassword: hashedPassword
    })

    if (result) {
        return true
    }

    return false
}

module.exports = {
    findIdCusByEmail,
    findEnPassCusByEmail,
    findIn4CusByEmail,
    createCustomer
}