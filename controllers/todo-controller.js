const catchAsync = require("../utils/catchAsync");
const todoService = require("../services/todo-service");
const code = require("../constants/http-status");
const message = require("../constants/todo-constants");

module.exports = {
  create: catchAsync(async (req, res, next) => {
    const createdTodo = await todoService.createTodo(req, res);
    res.status(code.CREATED).json({
      message: message.CREATED_TODO,
      body: createdTodo,
    });
  }),

  list: catchAsync(async (req, res, next) => {
    const listTodos = await todoService.listTodos(req, res);
    res.status(code.OK).json({
      message: message.GOT_TODO,
      body: listTodos,
    });
  }),

  update: catchAsync(async (req, res, next) => {
    await todoService.updateTodo(req, res);
    res.status(code.OK).json({
      message: message.UPDATED_TODO(req.params.id),
      body: updatedTodo,
    });
  }),

  delete: catchAsync(async (req, res, next) => {
    await todoService.deleteTodo(req, res);
    res.status(code.OK).json({
      message: message.DELETED_TODO(req.params.id),
    });
  }),
};
