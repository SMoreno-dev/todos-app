module.exports = {
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

    await model.update(attributes.toUpdate, {
      where: attributes.toFind,
      transaction,
    });

    return findRow;
  },

  delete: async (model, attributes, transaction) => {
    await model.destroy({
      where: attributes.toFind,
      transaction,
    });

    return deleteRow;
  },
};
