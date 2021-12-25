module.exports = (object) => {
  const { id, email, createdAt, updatedAt } = object;
  return {
    id,
    email,
    createdAt,
    updatedAt,
  };
};
