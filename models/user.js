const conn = require('../database/database')
const bcrypt = require('bcryptjs')

function hashPassword(password){
    const hash = bcrypt.hashSync(password, 10)
    return password = hash
}

const User = {
    async getUsers(){
     return new Promise((resolve, reject)=>{
        conn.query('SELECT name, email, register FROM tb_users ORDER BY name',(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
    },
    async getUser(email){
        return new Promise((resolve,reject)=>{
            conn.query('SELECT * FROM tb_users WHERE email = ?',[
                email
            ],(err, results)=>{
                console.log(results)
                if(err){
                    reject(err)
                }else{
                    resolve(results[0])
                }
            })
        })
    },

    async insert (fields) {
        return new Promise((resolve, reject)=>{
            conn.query('CALL sp_users_insert(?,?,?)',[
                fields.name,
                fields.email,
                hashPassword(fields.password)
            ],(err, results)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(results[0])
                }
            })
        })
    },

    async updateUser (fields ,id) {
        console.log(fields, id)
        return new Promise((resolve, reject)=>{
            conn.query('CALL sp_users_update(?,?,?)',[
                fields.name,
                fields.email,
                id
            ],(err, results)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(results[0])
                }
            })
        })
    },

    async deleteUser (id){
        return new Promise((resolve, reject)=>{
            conn.query('CALL sp_users_delete(?)',[
                id
            ],(err, results)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    }
   
}
module.exports = User