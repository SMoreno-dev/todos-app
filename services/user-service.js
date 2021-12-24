const { User } = require("../models");
const repository = require("../repositories/base-repository.js");

//Attributes to use in repository
const attributes = (req) => {
  const { body } = req;
  const { email } = body;
  return {
    id: req.params.id,
    toFind: { email },
    toCreateOrUpdate: body,
  };
};

module.exports = {
  createUser: async (req, res) => {
    const createdUser = await repository.create(User, attributes(req));
    if (createdUser === false) {
      const errorToThrow = new Error();
      errorToThrow.status = 403;
      errorToThrow.message = "This user email already exists";
      throw errorToThrow;
    }

    //TODO: Encrypt password and generate token
    return createdUser;
  },
};
