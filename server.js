//Dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

//Routes imports
const indexRouter = require("./routes/index-router.js");

//Env variables
dotenv.config();
const { HOST, PORT } = process.env;

//Server configuration
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, HOST, () => {
  console.log("Server running on port ", PORT);
});

//Index
app.use("/", indexRouter);

//Catch 404
app.use((req, res, next) => {
  const errorToThrow = new Error();
  errorToThrow.status = 404;
  errorToThrow.message = "NOT FOUND";
  next(errorToThrow);
});

//Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status: status,
    message: err.message,
  });
});

module.exports = app;
