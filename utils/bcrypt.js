const bcrypt = require("bcrypt");

module.exports = {
  encryptPassword: async (password) => {
    if (!password) return null;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  comparePassword: async (newPass, oldPass) => {
    return await bcrypt.compare(newPass, oldPass);
  },
};
