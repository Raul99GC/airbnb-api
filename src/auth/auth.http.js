const jwt = require('jsonwebtoken')

const {
    loginUser
} = require('./auth.controllers')

const login = (req, res) => {
    const data = req.body

    if (!data.email || !data.password) {
        return res.status(400).json({
            message: 'Missing Data'
        })
    }
    loginUser(data.email, data.password)
        .then(response => {
            console.log("la respuesta a la verificacion es", response)
            if(response) {
                const token = jwt.sign({
                    id: response.id,
                    email: response.email,
                    rol: response.rol
                }, 'academlo')
                res.status(200).json({
                    message: 'Tus credenciales son correctas',
                    token: token
                })
            } else {
                return res.status(401).json({message: 'Invalid Credentials'})
            }
            
        })
        .catch(() => res.status(401).json({
            message: 'Invalid Credentials'
        }))





}

module.exports = {
    login
}