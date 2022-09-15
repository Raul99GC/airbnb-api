const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require('../models/user.model');
const Roles = require("../models/roles.model");
// const { where } = require("sequelize/types");

const userDB = [{
  id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
  firstName: "Sahid",
  lastName: "Kick",
  gender: "male",
  email: "sahid.kick@academlo.com",
  password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  phone: "1234567890",
  birthdayDate: "22/10/2000",
  dni: "",
  address: "",
  role_id: "24ca1c13-6068-42cf-9f16-71c7d3840b6a",
  profileImage: "",
  status: "active",
  verified: false
},
{
  "id": "9cc4a692-9cfa-4408-ae4b-74e2df27d643",
  "first_name": "Raul",
  "last_name": "Kick",
  "email": "raul@academlo.com",
  "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  "phone": "1234567890",
  "birthday_date": "22/10/2000",
  "rol": "normal",
  "profile_image": "",
  "country": "mexico",
  "is_active": true,
  "verified": false
}];

const getAllUsers = async () => {

  const data= await Users.findAll({
    attributes: {
      exclude: ['password']
    }
  })
  return data;
  //? select * from users;
};

const getUserById = async(id) => {
  
  const data = await Users.findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['password']
    }
  })
  return data
  //? select * from users where id = ${id};
};


const createUser = async(data) => {
  const newUser =  await Users.create({
    id: uuid.v4(), 
    firstName: data.first_name, 
    lastName: data.last_name,
    gender: data.gender, 
    email: data.email, 
    password: hashPassword(data.password), 
    phone: data.phone, 
    birthdayDate: data.birthday_date,
    dni: data.dni,
    role_id: "94c74f7f-5adb-45fb-800e-f5bcc8b9217c",
    address: data.address, 
    profileImage: data.profile_image,
    status: 'active',
    verified: false,
  })
  // const newUserWithSpreadOperator =  await Users.create({
  //   ...data,
  //   id: uuid.v4(), 
  //   password: hashPassword(data.password), 
  //   role: "normal", 
  //   is_active: true,
  //   verified: false,
  // })
  return newUser

};


const editUser = async (userId, data, userRole) => {
  
  const {id, password, verified, roleId, ...restOfProperties} = data
  if('admin' === userRole) {
    console.log()
    const response =  await Users.update({...restOfProperties}, {where: {id: userId}})
    return response
  } else {

    const response = await Users.update(restOfProperties, {where: {id: userId}})
    return response
  }
}

const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id
    }
  })
  return data
} 

const getUserByEmail = async (email) => {
  const data = await Users.findOne({where: {email: email}})

  return data
}

const editProfileImg = async (userID, imgUrl) => {
  const response = await Users.update({
    image_url: imgUrl
  }, {
    where: {
      id: userID
    }
  })
  return response
}


const getUserWithRole = async (userId) => {
  const data = await Users.findOne({
    where: {
      id: userId
    },
    include: {
      model: Roles,
      as: 'role',
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      },
    },
    attributes: {
      exclude: ['roleId', 'createdAt', 'updatedAt', 'password']
    }
  });
  return data;
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg,
  getUserWithRole
}

