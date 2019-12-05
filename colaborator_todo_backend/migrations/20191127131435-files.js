'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'files',
      'author',
      {
        type:Sequelize.STRING,
        defaultValue:"Jagan"
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'files',
      'author'
    )
  }
};
