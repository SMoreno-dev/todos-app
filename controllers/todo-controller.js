const catchAsync = require("../utils/catchAsync");
const todoService = require("../services/todo-service");

module.exports = {
  create: catchAsync(async (req, res, next) => {
    const createdTodo = await todoService.createTodo(req, res);
    res.status(201).json({
      message: "Successfully created TODO",
      body: createdTodo,
    });
  }),

  list: catchAsync(async (req, res, next) => {
    const listTodos = await todoService.listTodos(req, res);
    res.status(200).json({
      message: "Returning TODOs",
      body: listTodos,
    });
  }),

  update: catchAsync(async (req, res, next) => {
    const updatedTodo = await todoService.updateTodo(req, res);
    res.status(200).json({
      message: "Successfully updated TODO",
      body: updatedTodo,
    });
  }),

  delete: catchAsync(async (req, res, next) => {
    await todoService.deleteTodo(req, res);
    res.status(200).json({
      message: "Successfully deleted TODO",
    });
  }),
};
