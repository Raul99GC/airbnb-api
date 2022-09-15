const Accommodation_images = require("../models/accommodation_images.model");
const Accommodations = require("../models/accommodations.model");
const Places = require("../models/places.model");
const Reservations = require("../models/reservations.model");
const Users = require("../models/user.model");
const Users_images = require("../models/users_images.model");
const Roles = require("../models/roles.model");

const uuid = require('uuid')

const generateData = async() => {

  // await Accommodations.sync({force: true})
  // await Places.sync({force: true})
  // await Roles.sync({force: true})
  // await Users.sync({force: true})

  await Roles.bulkCreate([{name: "guest", id: "fef3a08d-2cec-4728-9745-7cbd2b37e557"}, {name: "host", id: "97006fe0-4a35-47f4-bfbf-fc962e5fe500"}, {name: "admin", id: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473"}], {validate: true})
  await Users.bulkCreate([
    {
    id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    firstName: "Sahid",
    lastName: "Kick",
    gender: "male",
    email: "sahid.kick@academlo.com",
    password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
    phone: "1234567890",
    birthdayDate: "2000/10/22",
    dni: "",
    address: "",
    roleId: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473",
    profileImage: "asd.com",
    status: "active",
    verified: false
  },
  {
    id: "096e556a-3e57-4b13-b4e0-9a117498ebb7",
    firstName: "Raul",
    lastName: "Cordoba",
    gender: "male",
    email: "raul@academlo.com",
    password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
    phone: "1234567890",
    birthdayDate: "2000/10/22",
    dni: "",
    address: "",
    roleId: "97006fe0-4a35-47f4-bfbf-fc962e5fe500",
    profileImage: "asd.com",
    status: "active",
    verified: false
  }
])

  await Places.bulkCreate([
    {
      id: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
      city: 'Guadalajara',
      state: 'Jalisco',
      country: 'México',
      continent: 'America'
    },
    {
      id: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
      city: 'Zapopan',
      state: 'Jalisco',
      country: 'México',
      continent: 'America'
    },
    {
      id: '3436a556-6623-40ba-88b8-2e01009f9d82',
      city: 'Suba',
      state: 'Bogotá',
      country: 'Colombia',
      continent: 'America'
    },
    {
      id: '134a55b6-487c-46cc-a5b5-9392af20c205',
      city: 'Medellín',
      state: 'Antioquia',
      country: 'Colombia',
      continent: 'America'
    },
    {
      id: '3a230417-80ae-4232-a8ff-6fd50068a777',
      city: 'Azcapotzalco',
      state: 'CDMX',
      country: 'México',
      continent: 'America'
    },
    {
      id: '0d907427-7623-4ec9-8c6d-270bb92fbbe7',
      city: 'Monterrey',
      state: 'Muevo León',
      country: 'México',
      continent: 'America'
    },
  ])

  
  await Accommodations.bulkCreate([
    {
    id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    title: "premium - vistas 360 ciudad (alberca y gym)",
    description: "asd",
    guests: 6,
    rooms: 3,
    beds: 3,
    bathrooms: 4.5,
    price: 1536.00,
    hostId : '74cd6011-7e76-4d6d-b25b-1d6e4182ec2f',
    score: 0.00,
    placeId: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
    commision: 150.00
  },
  {
    id: "feb124ea-d730-42a5-9348-2321118d0a61",
    title: "CASA MAREA, Marina Brisas, Increíble vista",
    description: "asd",
    guests: 12,
    rooms: 4,
    beds: 7,
    bathrooms: 4.5,
    price: 7008.00,
    hostId : '096e556a-3e57-4b13-b4e0-9a117498ebb7',
    score: 0.00,
    placeId: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
    commision: 150.00
  }
  ])

  await Reservations.create({
    "id": "63611eb4-359a-4ddb-8372-ee0de5a40092",
    "kits": 0,
    "babies": 0,
    "pets": 0,
    "isFinished": false,
    "isCanceled": false,
    "arrival": "2022-10-12T00:00:00.000Z",
    "departure": "2022-10-13T00:00:00.000Z",
    "adults": 2,
    "id": "b4775a2d-3094-447c-bf87-50dbd96e86b4",
    "userId": "096e556a-3e57-4b13-b4e0-9a117498ebb7",
    "accommodationId": "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    "updatedAt": "2022-09-14T19:21:13.054Z",
    "createdAt": "2022-09-14T19:21:13.054Z",
    "score": null
  })

}


module.exports = generateData