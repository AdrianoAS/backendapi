const userController = require('../controllers/userController')
const authenticate = require('../src/authenticate')

module.exports = (app) =>{

app.post('/authenticate/login',authenticate.authenticate)

app.get('/api/users', userController.listAll)
app.post('/api/users', userController.create)
app.put('/api/users/:id', userController.update)
app.delete('/api/users/:id', userController.delete)

}