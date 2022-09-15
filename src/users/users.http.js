const userControllers = require("./users.controllers");

const getAll =  (req, res) => {
  userControllers.getAllUsers()
    .then((response) => {
       res.status(200).json({
        items: response.length, 
        users: response
      })
    })
    .catch((err) => {
      res.status(400).json({err})
    })

  
};

const getById = (req, res) => {
  const id = req.params.id;
  userControllers.getUserById(id)
    .then(response => {
      res.status(200).json({response})
    })
    .catch(err => {
      res.status(404).json({message: `El usuario con el id ${id} no existe`, err})
    })
};

const register = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({
      message: "Missing Data"
    });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.password ||
    !data.birthday_date ||
    !data.country
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        birthday_date: "DD/MM/YYYY",
        country: "string",
      },
    });
  } else {
    userControllers.createUser(data)
      .then((response) => {
        res.status(201).json({
          message: `User created succesfully with id: ${response.id}`,
          user: response,
        });
      })
      .catch(err => {
        res.status(400).json({message : err})
      })
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  userControllers.deleteUser(id)
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
    
};

// * es para el admin
const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const roleId = req.user.role
  if (!Object.keys(data).length) {
    return res.status(400).json({
      message: "Missing Data"
    });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.rol ||
    !data.profile_image ||
    !data.birthday_date ||
    !data.country ||
    !data.is_active
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        phone: "+521231231230",
        rol: "normal",
        profile_image: "example.com/img/example.png",
        birthday_date: "DD/MM/YYYY",
        country: "string",
        is_active: true
      },
    });
  } else {

    userControllers.editUser(id, data, roleId)
      .then(response => {
        res.status(200).json({
          message: 'User edited succesfully',
          user: response
        })
      })
      .catch(err => {
        res.status(400).json({err})
      })
  }
};

const getMyUser = (req, res) => {
  
  const id = req.user.id;
  console.log("1111111111111111111111111111 ", id)
  userControllers.getUserById(id)
    .then(response => {
      return res.status(200).json(response)
    })
    .catch(err => {
      res.status(404).json({
        message: `El usuario con el id ${id} no existe`
      })
    })

}


const editMyUser = (req, res) => {
  const id = req.user.id
  const data = req.body

  if (!Object.keys(data).length) {
    return res.status(400).json({
      message: "Missing Data"
    });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.profile_image ||
    !data.birthday_date ||
    !data.country ||
    !data.is_active
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        phone: "+521231231230",
        rol: "normal",
        profile_image: "example.com/img/example.png",
        birthday_date: "DD/MM/YYYY",
        country: "string",
        is_active: true
      },
    });
  } else {
    userControllers.editUser(id, data)
      .then(response => {
        return res.status(200).json({
          message: 'User edited succesfully',
          user: response
        })
      })
      .catch(err => {
        res.status(400).json({err})
      })

  }

}

const removeMyUser = (req, res) => {
  const id = req.user.id
  const data = userControllers.deleteUser(id);

  if(data) {
    return res.status(204)
  } else {
    return res.status(400).json({message: 'Invalid ID 1'}) 
  }

}

const postProfileImg = (req, res) => {
  const userId = req.user.id;
  const imgPath = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename

  const data = userControllers.editProfileImg(userId, imgPath)
  res.status(200).json(data)

}

const getUserRole = (req, res) => {
  const id = req.params.id
  userControllers.getUserWithRole(id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(err =>  {
      res.status(400).json({message: err})
    })
}


module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  getMyUser,
  editMyUser,
  removeMyUser,
  postProfileImg,
  getUserRole
};