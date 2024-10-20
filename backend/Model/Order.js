const database = require('../Config/ConfigDb')
const { Sequelize } = require('sequelize')
const sequelize = database

const attributes = {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cus_id: {
        field: 'cus_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    shoe_id: {
        field: 'shoe_id',
        type: Sequelize.INTEGER,
        allowNull: false
    }
}

const options = {
    indexes: [{
        unique: true,
        fields: ['id']
    }],
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false
}

class Order extends Sequelize.Model {}

Order.init(attributes, options)

module.exports = Order