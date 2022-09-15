const placesControllers = require('./places.controllers')

const getAll = (req, res) => {

    placesControllers.getAllPlaces()
        .then(response => {
            res.status(200).json({
                items: response.length,
                places: response
            })
        })
        .catch(err => {
            res.status(400).json({
                err
            })
        })
}

const getById = (req, res) => {
    
    const placeId = req.params.id
    placesControllers.getPlacesById(placeId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(404).json({message: `The place with id: ${placeId} does not exist `, err})
        })
}

module.exports= {
    getAll,
    getById
}