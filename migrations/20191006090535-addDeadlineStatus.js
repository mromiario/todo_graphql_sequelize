'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'deadline', Sequelize.DATE)
    .then(() => {
      queryInterface.addColumn('Todos', 'status', Sequelize.BOOLEAN)
    })
    ;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'deadline')
    .then(() => {
      queryInterface.removeColumn('Todos', 'status')
    })
  }
};
