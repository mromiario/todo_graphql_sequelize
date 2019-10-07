if(!process.env.NODE_ENV || process.env.DEV == 'development'){
    const env = require('dotenv').config()
}
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const context = require('./schema/context');

const app = express();
const PORT = process.env.PORT

app.use(cors());
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context
});

server.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });

