const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')
const Accommodations = require('./accommodations.model')
const Users = require('./user.model')


const Reservations = db.define('reservations', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
            model: Users,
            key: 'id'
        }
    },
    arrival: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    departure: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    accommodationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'accommodation_id',
        references: {
            model: Accommodations,
            key: 'id'
        }
    },
    adults: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    kits: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNull: false
    },
    babies: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNull: false
    },
    pets: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNull: false
    },
    score: {
        type: DataTypes.DECIMAL
    },
    isFinished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'is_finished'
    },
    isCanceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'is_canceled'
    }
})

module.exports = Reservations