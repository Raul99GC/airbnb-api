const Accommodations = require('../models/accommodations.model') 
const Places = require('../models/places.model')
const Users = require('../models/user.model')


const uuid = require('uuid')

const getAllAccommodations = async() => {

    const data = await Accommodations.findAll({
        include: [
            {
                model: Users,
                as: 'user',
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'roleId', 'status', 'verified']
                }
            },
            {
                model: Places,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    /*const data = await Accmommodations.findAll({
        include: {
            model: Places,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId',  'placeId', 'hostId']
        }
    })

    const data = await Users.findAll({
        include: {
            model: Accmommodations,
            include: {
                model: Places,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId',  'placeId', 'hostId']
            }

        }
    }) */
    return data
}

const getAccommodationsById = async (id) => {
    const data = await Accommodations.findOne({
        where:{
            id,
        },
        include: [
            {
            model: Places,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        {
            model: Users,
            as: 'user',
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId',  'placeId', 'hostId']
        }
    })
    return data
}

 const getAccommodationsByUserId = async (hostId) => {
    const data = await Accommodations.findAll({
        where: {
            hostId
        },
    }) 
    return data
 }

const createAccommodation = async (data, userId, placeId) => {

    const newAccommodation = await Accommodations.create ({
        ...data,
        id: uuid.v4(),
        hostId: userId,
        placeId

    })
    
    return newAccommodation
}

const editAccommodation = async (data, userId, accommodationId) => {

    const {id, hostId, createdAt, updatedAt, ...restOfProperties} = data
    const response = await Accommodations.update({...restOfProperties},{
        where: {hostId: userId, id: accommodationId}
    })

    return response
}

const deleteAccommodation= async (id, userId) => {
    const data = await Accommodations.destroy({
        where: {
            id,
            hostId: userId
        }
    })
    return data 
}

module.exports = {
    getAllAccommodations,
    getAccommodationsById,
    getAccommodationsByUserId,
    createAccommodation,
    deleteAccommodation,
    editAccommodation
}