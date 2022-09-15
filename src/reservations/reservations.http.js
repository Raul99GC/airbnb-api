const reservationControllers = require('./reservations.controllers')


const getAll = (req, res) => {
    reservationControllers.getAllReservations()
        .then(response => {
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
}

const getReservationById = (req, res) => {
    const reservationId = req.params.id
    const userId = req.user.id
    reservationControllers.getReservationsById(reservationId, userId)
        .then(response => {
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
}

const getAllReservationsById = (req, res) => {
    const userId = req.user.id
    console.log("si se esta ejecutandooooooooooooooooooooooooooooooooooooooooooooo", userId)
    reservationControllers.getReservationsByUserId(userId)
        .then(response => {
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
}

const postReservation = (req, res) => {
    const userId = req.user.id
    const data = req.body
    const accommodationId = req.params.id

    console.log("**************", userId, data, accommodationId)


    reservationControllers.createReservation(data, userId, accommodationId)
        .then(response => {

            if (response) {
                res.status(201).json({
                    message: response
                })
            } else {
                res.status(400).json({
                    message: 'this accommodation has ben booked'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                err
            })
        })
}

const cancel = (req, res) => {
    const reservationId = req.params.id
    const userId = req.user.id
    const data = {
        isCanceled: req.body.isCanceled
    }
    if (!Object.keys(data).length) {
        res.status(400).json({
            message: "Missing Data"
        })
    } else if (!data.isCanceled) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                isCanceled: "boolean(true)"
            },
        })
    } else {
        reservationControllers.updateReservation(data, reservationId)
            .then(() => {
                res.status(200).json({
                    message: 'the reservation has been canceled'
                })
            })
            .catch(err => {
                console.log("aaaaaaaaaaaaaaaa soy un error")
                res.status(400).json({
                    err
                })
            })
    }
}



module.exports = {
    getAll,
    getAllReservationsById,
    postReservation,
    cancel,
    getReservationById
}