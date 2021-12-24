const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user-service.js");

module.exports = {
  create: catchAsync(async (req, res, next) => {
    const createdUser = await userService.createUser(req, res);
    res.status(200).json({
      message: "Successfully created new user",
      body: createdUser,
    });
  }),
};
