"use strict";

require("dotenv").config();
const { encryptPassword } = require("../utils/bcrypt");

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

const createTodos = (arr) => {
  const newArray = arr.map((user, index) => {
    return {
      userId: user.id,
      title: "Todo " + (index + 1),
      content: "TODO content for TODO " + (index + 1),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  return newArray;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const arrayOfUsers = await createUsers();
    await queryInterface.bulkInsert("Users", arrayOfUsers, {});

    const users = await queryInterface.sequelize.query(
      `SELECT * FROM "Users";`
    );
    const userRows = users[0];
    const todosToCreate = createTodos(userRows);
    console.log(todosToCreate);

    return await queryInterface.bulkInsert("Todos", todosToCreate, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Todos", null, {});
  },
};
