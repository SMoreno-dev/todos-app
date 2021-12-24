const { sequelize } = require("../models");

module.exports = {
  create: async (model, attributes) => {
    const createdUser = await sequelize.transaction(async (t) => {
      const [created, success] = await model.findOrCreate({
        where: attributes.toFind,
        defaults: attributes.toCreateOrUpdate,
      });

      return success ? created : false;
    });
    return createdUser;
  },
};
