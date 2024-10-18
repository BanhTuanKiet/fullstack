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
    cus_email: {
        field: 'cus_email',
        type: Sequelize.STRING,
        allowNull: false
    },
    shoe_name: {
        field: 'shoe_name',
        type: Sequelize.STRING,
        allowNull: false
    }
}

const options = {
    indexes: [{
        unique: true,
        fields: ['id']
    }],
    sequelize,
    modelName: 'Transaction',
    tableName: 'transaction',
    timestamps: false
}

class Transaction extends Sequelize.Model {}

Transaction.init(attributes, options)

module.exports = Transaction