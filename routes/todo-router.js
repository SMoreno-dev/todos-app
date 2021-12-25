const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo-controller");
const {
  validateUpdateTodo,
  validateCreateTodo,
} = require("../middleware/todo-middleware");
const authentication = require("../middleware/authentication");

router.post("/", authentication, validateCreateTodo, todoController.create);
router.get("/", todoController.list);
router.patch("/:id", authentication, validateUpdateTodo, todoController.update);
router.delete("/:id", authentication, todoController.delete);

module.exports = router;
