const { User } = require("../models");
const repository = require("../repositories/base-repository.js");

module.exports = {
  createUser: async (req, res) => {
    //Attributes for repository
    let { email } = req.body;
    const attributes = {
      toFind: { email },
      toCreate: req.body,
    };

    //Repository
    const createdUser = await repository.create(User, attributes);

    //Responses
    if (createdUser === false) {
      const errorToThrow = new Error();
      errorToThrow.status = 403;
      errorToThrow.message = "This user email already exists";
      throw errorToThrow;
    }

    //TODO: Encrypt password and generate token
    return buildUserObject(createdUser);
  },

  updateUser: async (req, res) => {
    //Attributes for repository
    const { id } = req.params;
    const attributes = {
      toFind: { id },
      toUpdate: req.body,
    };

    //Repository
    const updatedUser = await repository.update(User, attributes);

    //Responses
    if (updatedUser === false) {
      const errorToThrow = new Error();
      errorToThrow.status = 404;
      errorToThrow.message = "User not found";
      throw errorToThrow;
    }

    //Todo: add encryption in case of password
    return buildUserObject(updatedUser);
  },
};
