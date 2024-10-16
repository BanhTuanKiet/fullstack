const database = require('../Config/ConfigDb')
const { Sequelize } = require('sequelize')
const sequelize = database

const attributes = {
    id_Customer: {
        field: 'id_Customer',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    base32: {
        field: 'base32',
        type: Sequelize.STRING,
        allowNull: false
    },
}

const options = {
    indexes : [{
        unique: true,
        fields: ['id_Customer']
    }],
    sequelize,
    modelName: 'Secret',
    tableName: 'secret',
    timestamps: false
}

class SecretKey extends Sequelize.Model {}

SecretKey.init(attributes, options)

module.exports = SecretKey