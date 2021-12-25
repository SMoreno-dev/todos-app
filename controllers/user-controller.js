const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user-service");
const { encryptPassword, comparePassword } = require("../utils/bcrypt");
const buildUserObject = require("../utils/buildUserObject");
const { generateAccessToken } = require("../utils/jsonwebtoken");

module.exports = {
  create: catchAsync(async (req, res, next) => {
    const hashedPassword = await encryptPassword(req.body.password.toString());
    req.body.password = hashedPassword;

    const createdUser = await userService.createUser(req, res);
    res.status(201).json({
      message: "Successfully created new user",
      body: createdUser,
    });
  }),

  update: catchAsync(async (req, res, next) => {
    const updatedUser = await userService.updateUser(req, res);
    res.status(200).json({
      message: "Successfully updated user",
      body: updatedUser,
    });
  }),

  login: catchAsync(async (req, res, next) => {
    let { password } = req.body;

    const user = await userService.findUserByEmail(req, res);
    const validPassword = comparePassword(password.toString(), user.password);

    if (!validPassword) {
      const errorToThrow = new Error();
      errorToThrow.status = 401;
      errorToThrow.message = "Wrong credentials";
      throw errorToThrow;
    }

    const result = {
      user: buildUserObject(user),
      token: generateAccessToken(user),
    };

    res.status(200).json({
      message: "Successfully logged in",
      body: result,
    });
  }),
};
