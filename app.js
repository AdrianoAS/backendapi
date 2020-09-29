const express = require('express')
const bodyParser = require('body-parser')
const consign = require('consign')
const jwt = require('jsonwebtoken')
const authConfig = require('./src/authConfig.json')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api',(request, response, next)=>{

    const authHeader = request.headers.authorization

    if(!authHeader){
        return response.status(401).send({error: 'No token provide'})
    }
    const parts = authHeader.split(' ')

    if(!parts === 2){
      return  response.status(401).send({error: 'Token error'})
    }
    const [ bearer, token] = parts

    if(!/^Bearer$/i.test(bearer)){
      return  response.status(401).send({error: 'Token Malformatted'})
    }

    jwt.verify(token, authConfig.secret,(err, decoded)=>{
        if(err){
           return response.status(401).send({error: 'Token Invalid'})
        }
        request.userId = decoded.id
        next()
    })

})


consign().include('routers').into(app)

app.listen('3000',()=>{
    console.log('Server Runing...')
})
