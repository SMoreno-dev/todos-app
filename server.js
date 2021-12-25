//Dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

//Error handler
const {
  productionErrorHandler,
  defaultErrorHandler,
  developmentErrorHandler,
  testErrorHandler,
} = require("./utils/error-handler");

//Routes imports
const indexRouter = require("./routes/index-router.js");
const userRouter = require("./routes/user-router.js");
const todoRouter = require("./routes/todo-router");

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

//Users
app.use("/users", userRouter);

//Todos
app.use("/todos", todoRouter);

//Catch 404
app.use((req, res, next) => {
  const errorToThrow = new Error();
  errorToThrow.status = 404;
  errorToThrow.message = "NOT FOUND";
  next(errorToThrow);
});

// error handler
app.use((err, req, res, next) => {
  const { NODE_ENV } = process.env;

  switch (NODE_ENV) {
    case "development":
      developmentErrorHandler(err, req, res);
      break;

    case "production":
      productionErrorHandler(err, req, res);
      break;

    case "test":
      testErrorHandler(err, req, res);
      break;

    default:
      defaultErrorHandler(err, req, res);
      break;
  }
});
module.exports = app;
