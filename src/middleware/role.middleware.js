const Roles = require('../models/roles.model')
const Users = require('../models/user.model')

const roleAdminMiddleWare = async (req, res, next ) => {
    await Users.findOne({
        where: {
            id: req.user.id
        },
        include: {
            model: Roles,
        },
        attributes: {
            exclude: ['password', 'phone']
        }
    }).then(response => {
        req.user.role = response.role.name
        const role = req.user.role
        if (role === 'admin' ){ 
            next()
        } else {
            res.status(401).json({
                status: "error",
                message: "User not authorized to make this request",
              });
        }
    })
    .catch(err => {
        res.status(401).json({
            status: "error",
            message: "User not authorized to make this request",
            err
          })
    })
}

const roleHostMiddleWare = async (req, res, next ) => {
    await Users.findOne({
        where: {
            id: req.user.id
        },
        include: {
            model: Roles,
            
        },
        attributes: {
            exclude: ['password', 'phone']
        }
    }).then(response => {
        console.log("------------------",response.role.name)
        req.user.role = response.role.name
        const role = req.user.role
        if (role === 'host' ){ 
            next()
        } else {
            res.status(401).json({
                status: "error",
                message: "User not authorized to make this request",
              });
        }
    })
    .catch(err => {
        res.status(401).json({
            status: "error",
            message: "User not authorized to make this request",
            err
          })
    })
}



module.exports= {
    roleAdminMiddleWare,
    roleHostMiddleWare,
    
}

