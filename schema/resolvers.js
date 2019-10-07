const ControllerUser = require('../controllers/ControllerUser')
const ControllerTodo = require('../controllers/ControllerTodo')
const resolvers = {
    Query: {
        readUsers: ControllerUser.readUsers,
        readUser: ControllerUser.readUser,
        readTodos: ControllerTodo.readTodos,
        readTodo: ControllerTodo.readTodo,
        getHoliday: ControllerTodo.getHoliday
    },
    Mutation: {
        signup: ControllerUser.signup,
        login: ControllerUser.login,
        updateUser: ControllerUser.updateUser,
        createToDo: ControllerTodo.createToDo,
        deleteToDo: ControllerTodo.deleteToDo,
        updateToDo: ControllerTodo.updateToDo
    }

}

module.exports = resolvers