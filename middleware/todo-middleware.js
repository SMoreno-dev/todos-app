const code = require("../constants/http-status");
const message = require("../constants/todo-constants");

const isUndefined = (prop) => typeof prop === "undefined";

const validateCreateTodo = (req, res, next) => {
  let { title, content, userId } = req.body;
  if ([title, content, userId].some(isUndefined)) {
    return res
      .status(code.BAD_REQUEST)
      .json({ message: message.BAD_CREATE_TODO_REQUEST });
  }

  next();
};

const validateUpdateTodo = (req, res, next) => {
  let { title, content, completed } = req.body;
  if ([title, content, completed].every(isUndefined)) {
    return res
      .status(code.BAD_REQUEST)
      .json({ message: message.BAD_UPDATE_TODO_REQUEST });
  }

  next();
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
};
