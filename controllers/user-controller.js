const catchAsync = require("../utils/catchAsync");

module.exports = {
  create: catchAsync(async (req, res, next) => {
    return res.status(200).json("TODO: Add user registration");
  }),
};
