module.exports = {
  getById: async (model, attributes) => {
    return await model.findOne({ where: attributes.toFind });
  },

  create: async (model, attributes, transaction) => {
    const [row, created] = await model.findOrCreate({
      where: attributes.toFind,
      defaults: attributes.toCreate,
      transaction,
    });

    return !created ? false : row;
  },

  update: async (model, attributes, transaction) => {
    const findRow = await model.findOne({ where: attributes.toFind });
    if (!findRow) return false;

    const updateRow = await model.update(attributes.toUpdate, {
      where: attributes.toFind,
      transaction,
    });

    return !updateRow ? false : updateRow;
  },

  delete: async (model, attributes, transaction) => {
    await model.destroy({
      where: attributes.toFind,
      transaction,
    });

    return deleteRow;
  },
};
