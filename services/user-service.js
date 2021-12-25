const { User, sequelize } = require("../models");
const repository = require("../repositories/base-repository.js");
const { encryptPassword } = require("../utils/bcrypt");
const { generateAccessToken } = require("../utils/jsonwebtoken");
const buildUserObject = require("../utils/build-user-object");
const code = require("../constants/http-status");
const message = require("../constants/user-constants");

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
        return throwError(code.FORBIDDEN, message.USER_EXISTS);
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
      return throwError(code.INTERNAL_SERVER_ERROR, message.USER_NOT_CREATED);
    });
  },

  findUserByEmail: async (req, res) => {
    const attributes = {
      toFind: { email: req.body.email },
    };

    const user = await repository.find(User, attributes);
    return user.dataValues;
  },

  updateUser: async (req, res) => {
    //Attributes for repository
    const { id } = req.params;
    const { email, password } = req.body;
    const attributes = {
      toFind: { id },
      toUpdate: { email, password },
    };

    if (attributes.toUpdate.password) {
      attributes.toUpdate.password = encryptPassword(req.password);
    }

    //Repository
    await sequelize.transaction(async (t) => {
      const updateUser = await repository.update(User, attributes, t);

      //Responses
      if (updateUser === false) {
        return throwError(code.NOT_FOUND, message.USER_NOT_FOUND);
      }
    });

    const updatedUser = await repository.find(User, attributes);
    return buildUserObject(updatedUser);
  },
};
