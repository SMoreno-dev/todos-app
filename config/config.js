const { config } = require("dotenv");
config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  TEST_DB_USER,
  TEST_DB_PASSWORD,
  TEST_DB_NAME,
  TEST_DB_HOST,
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: TEST_DB_USER,
    password: TEST_DB_PASSWORD,
    database: TEST_DB_NAME,
    host: TEST_DB_HOST,
    dialect: "postgres",
  },
};
