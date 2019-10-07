const { AuthenticationError } = require('apollo-server-express')
const jwt = require('../helper/jwt')
const context = ({ req }) => {
    try {
        let auth = req.headers.token
        if(!auth)return undefined
        let decoded = jwt.verifyToken(auth);
        req.decoded = decoded
        return {
            loggedInUser: decoded
        }
    } catch(err) {
        console.log(err);
        throw new AuthenticationError('invalid token');
    }
} 
module.exports = context