const code = require("../constants/http-status");
const message = require("../constants/user-constants");

const isUndefined = (prop) => typeof prop === "undefined";

const validateCreateUser = (req, res, next) => {
  let { email, password } = req.body;
  if ([email, password].some(isUndefined)) {
    return res
      .status(code.BAD_REQUEST)
      .json({ message: message.BAD_CREATE_USER_REQUEST });
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  let { email, password } = req.body;
  if ([email, password].every(isUndefined)) {
    return res
      .status(code.BAD_REQUEST)
      .json({ message: message.BAD_UPDATE_USER_REQUEST });
  }

  next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};
