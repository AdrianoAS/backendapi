const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const authConfig = require('../src/authConfig.json')

function generatorToken(params = {}){
    return jwt.sign(params, authConfig.secret , {
        expiresIn:86400
    })
}

const userController = {
   async listAll(request, response){
    const results = await userModel.getUsers()
    if(!results){
        response.status(400).send({error: 'Not a  uses created'})
    }
    response.send(results)
    },

    async create( request, response){
        const results = await userModel.insert(request.body)
        if(!results){
            response.status(400).send('Cannot create user')
        }
        response.status(200).send({results,token:generatorToken({id:results.insertId})})
    },
    async update (request, response){
        const results  = await userModel.updateUser(request.body, request.params.id)
        if(!results){
            response.status(400).send({error: 'User not found'})
        }
        response.status(200).json(results)
    }
    ,
    async delete(request, response){
        const results = await userModel.deleteUser(request.params.id)
        if(!results){
            response.status(400).send({error: 'User not found'})
        }
        response.status(400).send(results)
    }
}
module.exports = userController