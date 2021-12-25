const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user-service");
const { encryptPassword, comparePassword } = require("../utils/bcrypt");
const buildUserObject = require("../utils/buildUserObject");
const { generateAccessToken } = require("../utils/jsonwebtoken");
const code = require("../constants/http-status");
const message = require("../constants/user-constants");

module.exports = {
  create: catchAsync(async (req, res, next) => {
    const hashedPassword = await encryptPassword(req.body.password.toString());
    req.body.password = hashedPassword;

    const createdUser = await userService.createUser(req, res);
    res.status(code.CREATED).json({
      message: message.CREATED_USER,
      body: createdUser,
    });
  }),

  update: catchAsync(async (req, res, next) => {
    const updatedUser = await userService.updateUser(req, res);
    res.status(code.OK).json({
      message: message.UPDATED_USER(req.params.id),
      body: updatedUser,
    });
  }),

  login: catchAsync(async (req, res, next) => {
    let { password } = req.body;

    const user = await userService.findUserByEmail(req, res);
    const validPassword = comparePassword(password.toString(), user.password);

    if (!validPassword) {
      const errorToThrow = new Error();
      errorToThrow.status = code.UNAUTHORIZED;
      errorToThrow.message = message.BAD_CREDENTIALS;
      throw errorToThrow;
    }

    const result = {
      user: buildUserObject(user),
      token: generateAccessToken(user),
    };

    res.status(code.OK).json({
      message: message.LOGGED_IN,
      body: result,
    });
  }),
};
