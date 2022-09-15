const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

const AcommodationImages = db.define('accommodation_images', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accommodationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'accommodation_id'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
})

module.exports = AcommodationImages