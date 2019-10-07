const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        id: ID
        username: String
        password: String
        email: String
    }

    type Todo {
        id: ID
        title: String
        description: String
        deadline: String
        status: Boolean
        UserId: ID
    }

    type Auth {
        token: String
    }

    type Info {
        message: String
    }

    type Query {
        readUsers: [User]
        readUser(id: ID!): User
        readTodos: [Todo]
        readTodo(id: ID!): Todo
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User
        login(username: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): Info
        createToDo(title: String!, description: String, deadline:String): Todo
        updateToDo(id:ID!,title: String, description: String, deadline:String, status:Boolean):Info
        deleteToDo(id:ID!):Info
    }
    
    
`

module.exports = typeDefs