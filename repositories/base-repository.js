const { sequelize } = require("../models");

module.exports = {
  create: async (model, attributes) => {
    const createdRow = await sequelize.transaction(async (t) => {
      const [created, success] = await model.findOrCreate({
        where: attributes.toFind,
        defaults: attributes.toCreate,
      });

      return success ? created : false;
    });
    return createdRow;
  },

  update: async (model, attributes) => {
    const findRow = await model.findOne({ where: attributes.toFind });
    if (!findRow) return false;

    const updatedRow = await sequelize.transaction(async (t) => {
      await model.update(attributes.toUpdate, {
        where: attributes.toFind,
      });

      return findRow;
    });

    return updatedRow;
  },
};
