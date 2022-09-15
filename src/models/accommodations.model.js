const {DataTypes} = require('sequelize')

const {db} = require('../utils/database');
const Places = require('./places.model');
const Users = require('./user.model');

const Accommodations = db.define('accommodations', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    guests: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    rooms: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    beds: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    bathrooms: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price: {    
        type: DataTypes.FLOAT,
        allowNull: false
    },
    hostId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'userId',
        references: {
            model: Users,
            key: 'id'
        }
    },
    score: {
        allowNull: false, 
        type: DataTypes.FLOAT
    },
    placeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'place_id',
        references: {
            model: Places,
            key: 'id'
        }
    },
    commision: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    }
})

module.exports = Accommodations;