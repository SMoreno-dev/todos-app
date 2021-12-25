const { User, sequelize } = require("../models");
const repository = require("../repositories/base-repository.js");
const { encryptPassword, comparePassword } = require("../utils/bcrypt");
const { generateAccessToken } = require("../utils/jsonwebtoken");
const buildUserObject = require("../utils/buildUserObject");

module.exports = {
  createUser: async (req, res) => {
    //Attributes for repository
    let { email } = req.body;
    const attributes = {
      toFind: { email },
      toCreate: req.body,
    };

    //Repository
    return await sequelize.transaction(async (t) => {
      const createdUser = await repository.create(User, attributes, t);

      //Responses
      if (createdUser === false) {
        const errorToThrow = new Error();
        errorToThrow.status = 403;
        errorToThrow.message = "This user email already exists";
        throw errorToThrow;
      }

      //Adds auth token to response
      const token = generateAccessToken(createdUser.dataValues);
      if (token !== null) {
        const userWithToken = Object.assign(buildUserObject(createdUser), {
          token,
        });
        console.log(userWithToken);
        return userWithToken;
      }

      const errorToThrow = new Error();
      errorToThrow.status = 500;
      errorToThrow.message = "Internal Server error";
      console.log("Something went wrong in user-service.js");
      throw errorToThrow;
    });
  },

  findUserByEmail: async (req, res) => {
    req.body;
    const attributes = {
      toFind: { email: req.body.email },
    };

    const user = await repository.find(User, attributes);
    return user.dataValues;
  },

  updateUser: async (req, res) => {
    //Attributes for repository
    const { id } = req.params;
    const attributes = {
      toFind: { id },
      toUpdate: req.body,
    };

    const { password } = attributes.toUpdate;

    if (password) {
      attributes.toUpdate.password = encryptPassword(req.password);
    }

    //Repository
    await sequelize.transaction(async (t) => {
      const updateUser = await repository.update(User, attributes, t);

      //Responses
      if (updateUser === false) {
        const errorToThrow = new Error();
        errorToThrow.status = 404;
        errorToThrow.message = "User not found";
        throw errorToThrow;
      }
    });

    const updatedUser = await repository.find(User, attributes);
    return buildUserObject(updatedUser);
  },
};
