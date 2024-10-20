const database = require('../Config/ConfigDb')
const { Sequelize } = require('sequelize')
const sequelize = database

const attributes = {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: false
    },
    star: {
        field: 'star',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        field: 'price',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    company: {
        field: 'company',
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        field: 'color',
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        field: 'category',
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        field: 'quantity',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    img: {
        field: 'img',
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
    modelName: 'Shoe',
    tableName: 'shoes',
    timestamps: false
}

class Shoe extends Sequelize.Model {}

Shoe.init(attributes, options)

Shoe.hasMany(require('./FavoritedItem', {
    foreignKey: 'shoe_id',
}))

Shoe.hasMany(require('./Order', {
    foreignKey: 'shoe_id'
}))

module.exports = Shoe