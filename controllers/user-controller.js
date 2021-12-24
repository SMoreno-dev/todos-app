const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user-service.js");
const buildUserObject = require("../utils/buildUserObject");

module.exports = {
  create: catchAsync(async (req, res, next) => {
    const createdUser = await userService.createUser(req, res);
    res.status(201).json({
      message: "Successfully created new user",
      body: buildUserObject(createdUser),
    });
  }),

  update: catchAsync(async (req, res, next) => {
    const updatedUser = await userService.updateUser(req, res);
    res.status(200).json({
      message: "Successfully updated user",
      body: buildUserObject(updatedUser),
    });
  }),
};
