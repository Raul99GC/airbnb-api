const accommodationsControllers = require('./accommodations.controllers')
const placeControllers = require('../places/places.controllers')

const getAll = (req, res) => {

    accommodationsControllers.getAllAccommodations()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const getById =(req, res) => {
    const id = req.params.id
    accommodationsControllers.getAccommodationsById(id)
        .then(response => {
            if(response) {
                res.status(200).json(response)
            } else {
                res.status(404),json({message: 'invaid id'})
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({err: err})
        })
}

const getAllByUserId = (req, res) => {
    // * aqui si es que no tiene ningun accommodation pasa como status 200 con el fin de que en front con un .length
    // * haga una cosa de que no tiene nungun accomodation actualmente
    const hostId = req.user.id

    accommodationsControllers.getAccommodationsByUserId(hostId)
        .then(response => {
            res.status(200).json({items: response.length, accommodations: response})
        })
        .catch(err => {
            console.log({message: err.message})
        })
}

const postAccommodation = (req, res) => {
    const data = req.body
    const userId = req.user.id
    const placeId = req.body.placeId
    accommodationsControllers.createAccommodation(data, userId, placeId)
        .then(response => {
            res.status(200).json({message: response})
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const editById = (req, res) => {
    const data = req.body
    const userId = req.user.id
    const accommodationId = req.params.id

    if (!Object.keys(data).length) {
        return res.status(400).json({
          message: "Missing Data"
        });
    } else if (
        !data.title ||
        !data.description ||
        !data.guests ||
        !data.rooms ||
        !data.beds ||
        !data.bathrooms ||
        !data.price ||
        data.score ||
        !data.placeId ||
        !data.commision ||
        !data.isActive 
      ) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", data)
        return res.status(400).json({
          message: "All fields must be completed",
          fields: {
            title: "string",
            description: "string",
            guests: "string",
            rooms: "number",
            beds: "number",
            bathrooms: "number",
            price: "float",
            score: "decimal",
            placeId: "string",
            commision: "float",
            isActive: "boolean",
          },
        })
    } else {
        accommodationsControllers.editAccommodation(data, userId, accommodationId)
        .then(response => {
            return res.status(200).json({
              message: 'Accommodation edited succesfully',
              accommodation: response
            })
          })
          .catch(err => {
            res.status(400).json({err})
          })
    
    }
}

const removeAccommodation = (req, res) => {
    const accommodationId = req.params.id
    const userId = req.user.id
    accommodationsControllers.deleteAccommodation(accommodationId, userId)
        .then(response => {
            if(response) {
                res.status(204).json()
              } else {
                res.status(400).json({message: 'invalid ID'})
              }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

module.exports= {
    getAll,
    getById,
    postAccommodation,
    getAllByUserId,
    removeAccommodation,
    editById
}