const { config } = require("dotenv");
config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgresql",
  },
};
