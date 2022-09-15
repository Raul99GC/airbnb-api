const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')


const UserImages = db.define('users_images', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            isUrl: true
        }
    }
})

module.exports = UserImages