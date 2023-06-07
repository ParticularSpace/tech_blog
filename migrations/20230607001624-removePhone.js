'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'phone_number');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('User', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
