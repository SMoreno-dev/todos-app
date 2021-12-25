const { Todo, sequelize } = require("../models");
const repository = require("../repositories/base-repository");
const throwError = require("../utils/throw-error");
const code = require("../constants/http-status");
const message = require("../constants/todo-constants");

module.exports = {
  createTodo: async (req, res) => {
    //Attributes for repository
    let { title, content } = req.body;
    let UserId = req.body.userId;

    const attributes = {
      toFind: { title },
      toCreate: { UserId, title, content },
    };

    //Repository
    return await sequelize.transaction(async (t) => {
      const createdTodo = await repository.create(Todo, attributes, t);

      //Reponses
      if (createdTodo === false) {
        return throwError(code.FORBIDDEN, message.TODO_EXISTS);
      }

      if (createdTodo) {
        return createdTodo;
      }

      return throwError(code.INTERNAL_SERVER_ERROR, message.TODO_NOT_CREATED);
    });
  },

  listTodos: async (req, res) => {
    const todos = await repository.list(Todo);
    return todos;
  },

  updateTodo: async (req, res) => {
    //Attributes for repository
    const { id } = req.params;
    const { title, content, completed } = req.body;
    const attributes = {
      toFind: { id },
      toUpdate: { title, content, completed },
    };

    //Repository
    const updatedTodo = await sequelize.transaction(async (t) => {
      const updateTodo = await repository.update(Todo, attributes, t);

      //Not found
      if (updateTodo === false) {
        return throwError(code.NOT_FOUND, message.TODO_NOT_FOUND);
      }

      return updateTodo;
    });

    //Internal error
    if (updatedTodo !== 1) {
      return throwError(code.INTERNAL_SERVER_ERROR, message.TODO_NOT_UPDATED);
    }

    //Success
    return await repository.find(Todo, attributes);
  },

  deleteTodo: async (req, res) => {
    //Attributes for repository
    const { id } = req.params;
    const attributes = {
      toFind: { id },
    };

    //Repository
    const deletedTodo = await sequelize.transaction(async (t) => {
      const deleteTodo = await repository.delete(Todo, attributes);

      //Not found
      if (deleteTodo === false) {
        return throwError(code.NOT_FOUND, message.TODO_NOT_FOUND);
      }
      return deleteTodo;
    });

    //Internal error
    if (deletedTodo !== 1) {
      return throwError(code.INTERNAL_SERVER_ERROR, message.TODO_NOT_DELETED);
    }
  },
};
