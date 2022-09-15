const router = require('express').Router()
const passport = require('passport')
const  roleMiddleWare  = require('../middleware/role.middleware')
require('../middleware/auth.middleware')(passport)
const { upload } = require('../utils/multer')

const userServices = require('./users.http')
const accommodationServices = require('../accommodations/accommodations.http')
const reservationServices = require('../reservations/reservations.http')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)


router.route('/me')
    .put(passport.authenticate('jwt', {session: false}), userServices.editMyUser)
    .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.removeMyUser)

router.route('/me/accommodations')
    .post(passport.authenticate('jwt', {session: false}), roleMiddleWare.roleHostMiddleWare, accommodationServices.postAccommodation)
    .get(passport.authenticate('jwt', {session: false}), roleMiddleWare.roleHostMiddleWare, accommodationServices.getAllByUserId)


router.route('/me/accommodations/:id')
    .get(passport.authenticate('jwt', {session: false}), roleMiddleWare.roleHostMiddleWare, accommodationServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleMiddleWare.roleHostMiddleWare, accommodationServices.removeAccommodation)
    .put(passport.authenticate('jwt', {session: false}), roleMiddleWare.roleHostMiddleWare, accommodationServices.editById)

router.route('/me/reservations')
    .get(passport.authenticate('jwt', {session: false}), reservationServices.getAllReservationsById)

router.route('/me/reservations/:id')
    .get(passport.authenticate('jwt', {session: false}), reservationServices.getReservationById)

router.route('/me/reservations/:id/cancel')
    .put(passport.authenticate('jwt', {session: false}), reservationServices.cancel)


router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session: false}), upload.single('profile_img'), userServices.postProfileImg)
    // .get()


router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleMiddleWare.roleAdminMiddleWare, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleMiddleWare.roleAdminMiddleWare, userServices.edit)

router.route('/:id/role')
    .get(userServices.getUserRole)




exports.router = router