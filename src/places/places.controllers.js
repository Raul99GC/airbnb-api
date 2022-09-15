const Places = require('../models/places.model')


const getAllPlaces = async () => {
    const data = await Places.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}

const getPlacesById = async (placeId) => {
    const data = await Places.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }

    })
    return data 
}


module.exports= {
    getAllPlaces,
    getPlacesById
}






