const {AuthenticationError, ForbiddenError} = require('apollo-server-express')
const {User} = require('../models/')
const error = require('../error-message')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')

class ControllerUser{
    static signup (parent, args, context) {
        return User.create(args)
        .then((data) => {
            return data
        })
        .catch(err => {
            throw new Error(err)
        })
    }

    static login (parent, args, context){
        return User.findOne({
            where : {
                username: args.username
            }
        })
        .then(user => {
            if(user){
                if(bcrypt.comparePass(args.password,user.password)){
                    const {id,username,email} = user
                    const token = jwt.generateToken({username,id,email})
                    return {token: token}
                }else{
                   throw new Error(error.signup.invalidUsernamePassword)
                }
            }else{
                throw new Error(error.signup.invalidUsernamePassword)
            }
        })
        .catch(err => {
            throw new Error(err)
        })
    }

    static updateUser (parent, args, context) {
        if (!context.loggedInUser){
            throw new ForbiddenError(error.auth.failed)
        } else {
            return User.update(args 
                ,{where :
                    { 
                        id : context.loggedInUser.id
                    }
                })
            .then(() =>{
                return({message : 'data diupdate'})
            })
        }
    }

    static readUsers(parents, args, context){
        return User.findAll()
        .then(data => {
            return data
        })
    }

    static readUser(parents, args, context){
        return User.findOne({
            where : {
                id : args.id
            }
        })
        .then(data => {
            return data
        })
    }
}

module.exports = ControllerUser