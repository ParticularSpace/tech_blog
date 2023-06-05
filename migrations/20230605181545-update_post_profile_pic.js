'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'profile_picture', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('posts', 'profile_picture');
  }
};
