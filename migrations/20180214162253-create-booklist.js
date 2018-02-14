/*eslint-disable*/
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('booklists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookid: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      liked: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('booklists');
  }
};
