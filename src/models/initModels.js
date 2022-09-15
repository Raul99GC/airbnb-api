const Users = require('./user.model')
const Users_images = require('./users_images.model')
const Roles = require('./roles.model')
const Reservations = require('./reservations.model')
const Accommodations = require('./accommodations.model')
const Accommodation_images = require('./accommodation_images.model')
const Places = require('./places.model')


const initModel = () => {
    // ? belongsTo
    // ? belongsToMany
    // ? hasOne
    // ? hasMany


    // ! Users 1 : n Roles
    Roles.hasMany(Users)
    Users.belongsTo(Roles)

    // ! Users n : 1 UserImages
    Users_images.belongsTo(Users)
    Users.hasMany(Users_images)

    // ! Users n : n Acommodations
    // Users.belongsToMany(Accommodations, {through: Reservations})
    // Accommodations.belongsToMany(Users, {through: Reservations})

    Users.hasMany(Reservations)
    Reservations.belongsTo(Users)

    Accommodations.hasMany(Reservations)
    Reservations.belongsTo(Accommodations)

    // ! Accomodations 1 : n AccomodationImages
    Accommodation_images.belongsTo(Accommodations)
    Accommodations.hasMany(Accommodation_images)

    // ! Accomodations n : 1 Places
    Places.hasMany(Accommodations)
    Accommodations.belongsTo(Places)

    // ! User 1 : n accommodations (Host)
    Users.hasMany(Accommodations)
    Accommodations.belongsTo(Users)
}

module.exports = initModel