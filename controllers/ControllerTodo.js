const {AuthenticationError, ForbiddenError} = require('apollo-server-express')
const {Todo} = require('../models/')
const error = require('../error-message')
const redis = require('redis')
const client = redis.createClient({detect_buffers:true})
const axios = require('axios')
const getHolidayCache = require('../helper/cacheHoliday')


class ControllerTodo{
    static createToDo (parent, args, context) {
        if (!context.loggedInUser){
            throw new ForbiddenError(error.auth.failed)
        }
        else {
            const {title, description, deadline} = args
            return Todo.create({title,description, deadline, UserId : context.loggedInUser.id})
            .then(data => {
                return data
            })
        }
    }

    static readTodos (parent, args, context) {
        if (!context.loggedInUser){
            throw new ForbiddenError(error.auth.failed)
        }
        else {
            return Todo.findAll({
                where : {
                    UserId : context.loggedInUser.id
                }
            })
            .then(data=>{
                return data
            })
        }
    }

    static readTodo (parent, args, context){
        if (!context.loggedInUser){
            throw new ForbiddenError(error.auth.failed)
        }
        else {
            return Todo.findOne({
                where : {
                    id : args.id,
                    }
                })
                .then(data => {
                    if (data.UserId == context.loggedInUser.id){
                        return data
                    } else {
                        throw new ForbiddenError(error.auth.failed)
                    }
                })
        }
    }

    static deleteToDo (parent, args, context) {
        if (!context.loggedInUser){
            throw new ForbiddenError(error.auth.failed)
        }
        else {
            return Todo.findOne({
                where : {
                    id : args.id,
                    }
                })
                .then(data => {
                    if (data.UserId == context.loggedInUser.id){
                        return Todo.destroy({where : {
                             id : args.id
                            }
                        })
                        .then(()=>{
                            return {message : 'data deleted'}
                        })
                    } else {
                        throw new ForbiddenError(error.auth.failed)
                    }
                })
        }
    }

    static updateToDo(parent, args, context){
        if (!context.loggedInUser){
            throw new ForbiddenError(error.auth.failed)
        }
        else {
            return Todo.findOne({
                where : {
                    id : args.id,
                    }
                })
                .then(data => {
                    if (data.UserId == context.loggedInUser.id){
                        return Todo.update(args, {where : {
                             id : args.id
                            }
                        })
                        .then(()=>{
                            return {message : 'data updated'}
                        })
                    } else {
                        throw new ForbiddenError(error.auth.failed)
                    }
                })
        }

    }

    static getHoliday (parent, args, context){
        return getHolidayCache()
        .then((reply) => {
            if(reply){
                return (JSON.parse(reply))
            }else{
                return axios.get('https://date.nager.at/api/v2/nextpublicholidays/ID')
                .then(({data}) => {
                    client.set('holidays', JSON.stringify(data,null,2), 'EX', 60)
                    return data
                })
            }
          })
    }
}

module.exports = ControllerTodo