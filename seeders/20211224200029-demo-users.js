"use strict";
const dotenv = require("dotenv");
dotenv.config();

//Mock data
const mockUsers = [];
for (let i = 1; i < 11; i++) {
  let user = {
    email: `user${i}@gmail.com`,
    password: `${process.env.MOCK_USER_PASSWORD + i}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockUsers.push(user);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", mockUsers);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
