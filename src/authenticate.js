const user = require('../models/user')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../src/authConfig.json')

function generatorToken(params = {}){
    return jwt.sign(params, authConfig.secret , {
        expiresIn:86400
    })
}

const Authenticate ={

    async authenticate(request, response){
        const {email, password} = request.body
        const results = await user.getUser(email)
        if(!results){
            response.status(400).send({error: 'User not found'})
        }
        if(!await bycrypt.compareSync(password, results.password)){
            response.status(400).send({error: 'Password invalid'})
        }
        const token = generatorToken({id:results.id})
        response.status(200).send({results, token})
    }
}
module.exports = Authenticate