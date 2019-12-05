'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'files',
      'author',
      'author_of_file'
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'files',
      'author_of_file',
      'author'
    )
  }
};
