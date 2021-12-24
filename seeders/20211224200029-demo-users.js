"use strict";

require("dotenv").config();
const encryptPassword = require("../utils/encryptPassword");

const createUsers = async () => {
  let arr = [];
  for (let i = 1; i < 11; i++) {
    let password = await encryptPassword(process.env.MOCK_USER_PASSWORD + i);
    if (password !== undefined) {
      arr.push({
        email: `user${i}@gmail.com`,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  return arr;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const arrayOfUsers = await createUsers();
    await queryInterface.bulkInsert("Users", arrayOfUsers);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
