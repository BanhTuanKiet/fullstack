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
    email: {
        field: 'email',
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        field: 'avatar',
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        field: 'password',
        type: Sequelize.STRING,
        allowNull: false
    },
    encyptionPassword: {
        field: 'encyptionPassword',
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
    modelName: 'Customer',
    tableName: 'customer',
    timestamps: false
}

class Customer extends Sequelize.Model {}

Customer.init(attributes, options)

Customer.hasOne(require('./SecretKey'), { 
    foreignKey: 'id_Customer' 
})

Customer.hasMany(require('./FavoritedItem', {
    foreignKey: 'cus_id'
}))

// Customer.hasOne(require('./Transaction', {
//     foreignKey: 'cus_email'
// }))

module.exports = Customer