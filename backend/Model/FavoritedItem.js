const database = require('../Config/ConfigDb')
const { Sequelize } = require('sequelize')
const sequelize = database

const attributes = {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
    modelName: 'FavoritedItem',
    tableName: 'favoriteditems',
    timestamps: false
}

class FavoritedItem extends Sequelize.Model {}

FavoritedItem.init(attributes, options)

// FavoritedItem.belongsTo(require('./Customer'), { foreignKey: 'cus_id' })

module.exports = FavoritedItem