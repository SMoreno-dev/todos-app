module.exports = (object) => {
  const { email, createdAt, updatedAt } = object;
  return {
    email,
    createdAt,
    updatedAt,
  };
};
