const { Todo, sequelize } = require("../models");
const repository = require("../repositories/base-repository");

module.exports = {
  createTodo: async (req, res) => {
    //Attributes for repository
    let { userId, title, content } = req.body;
    const attributes = {
      toFind: { title },
      toCreate: { userId, title, content },
    };

    //Repository
    return await sequelize.transaction(async (t) => {
      const createdTodo = await repository.create(Todo, attributes, t);

      //Reponses
      if (createdTodo === false) {
        const errorToThrow = new Error();
        errorToThrow.status = 403;
        errorToThrow.message = "A TODO with this title already exists";
        throw errorToThrow;
      }

      if (createdTodo) {
        return createdTodo;
      }

      const errorToThrow = new Error();
      errorToThrow.status = 500;
      console.log("Something went wrong in user-service.js");
      throw errorToThrow;
    });
  },

  listTodos: async (req, res) => {
    const todos = await repository.list(Todo);
    return todos;
  },

  updateTodo: async (req, res) => {
    //Attributes for repository
    const { id } = req.params;
    const attributes = {
      toFind: { id },
      toUpdate: req.body,
    };

    //Repository
    await sequelize.transaction(async (t) => {
      const updateTodo = await repository.update(Todo, attributes, t);

      //Responses
      if (updateTodo === false) {
        const errorToThrow = new Error();
        errorToThrow.status = 404;
        errorToThrow.message = "User not found";
        throw errorToThrow;
      }

      const updatedTodo = await repository.find(Todo, attributes);
      return updatedTodo;
    });
  },
};
