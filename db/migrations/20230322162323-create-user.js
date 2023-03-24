'use strict';

const { UserSchema, USER_TABLE } = require("../models/user.model");

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(USER_TABLE);
  }
};
