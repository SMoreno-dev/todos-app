const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user-service");
const encryptPassword = require("../utils/encryptPassword");

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
};
