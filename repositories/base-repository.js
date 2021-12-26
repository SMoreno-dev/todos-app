module.exports = {
  find: async (model, attributes) => {
    const row = await model.findOne({ where: attributes.toFind });
    return row;
  },

  list: async (model) => {
    const rows = await model.findAll({});
    return rows;
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

    return updateRow[0];
  },

  delete: async (model, attributes, transaction) => {
    const findRow = await model.findOne({ where: attributes.toFind });
    if (!findRow) return false;

    const deleteRow = await model.destroy({
      where: attributes.toFind,
      transaction,
    });

    return deleteRow;
  },
};
