const code = require("../constants/http-status");
const message = require("../constants/todo-constants");

const validateCreateTodo = (req, res, next) => {
  let { title, content, userId } = req.body;
  if (![title, content, userId].every(Boolean)) {
    return res
      .status(code.BAD_REQUEST)
      .json({ message: message.BAD_CREATE_TODO_REQUEST });
  }

  next();
};

const validateUpdateTodo = (req, res, next) => {
  let { title, content, userId } = req.body;
  if (![title, content, userId].some(Boolean)) {
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
