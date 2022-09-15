const Reservations = require('../models/reservations.model')
const Users = require('../models/user.model')
const Accommodations = require('../models/accommodations.model')

const uuid = require('uuid')
const { Op } = require("sequelize");

const getAllReservations = async () => {
    const data = await Reservations.findAll({
        include: [
            {
                model: Users,
            },
            {
                model: Accommodations
            }
        ]
    })
    return data
}

const getReservationsById = async (id, userId) => {
    const data = await Reservations.findOne({
        where: {
            id,
            userId
        },
        include: [
            {
                model: Users,
            },
            {
                model: Accommodations
            }
        ]
    })
    return data
}

const getReservationsByUserId = async (userId) => {

    const data = await Reservations.findAll({
        where: {
            userId
        },
        include: [
            {
                model: Users,
            },
            {
                model: Accommodations
            }
        ]
    })
    return data
}

 

const createReservation = async (data, userId, accommodationId) => {

    const findReservation = await Reservations.findOne({
        where: {
            accommodationId,

            [Op.or] :[
                {arrival: data.arrival},
                {departure: data.departure}
            ]
            
        }
    })

    if(findReservation) {
        return false
    } else {
        const {isFinished, isCanceled, ...restOfData} = data
        const newReservation = await Reservations.create({
            ...restOfData,
            id: uuid.v4(),
            userId, 
            accommodationId: accommodationId,
           
        })
        return newReservation
    }
}

// const cancelReservation = async (reservationId, userId, isCanceled) => {
//     const data = await Reservations.update({isCanceled},{
//         where: {
//             id: reservationId,
//             userId,
//         }
//     })
//     return data
// }

const updateReservation = async (data, reservationId) => {
    const {id, createdAt, updatedAt, ...restOfData} = data
    console.log("1111111111111111111111111", Object.keys(restOfData))

    const response = await Reservations.update({...restOfData}, {
        where: {
            id: reservationId
        }
    })
    return response
}


module.exports = {
    getAllReservations,
    getReservationsById,
    getReservationsByUserId,
    createReservation,
    // cancelReservation,
    updateReservation
}