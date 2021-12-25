const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo-controller");
const {
  validateUpdateTodo,
  validateCreateTodo,
} = require("../middleware/todo-middleware");

router.post("/", validateCreateTodo, todoController.create);
router.get("/", todoController.list);
router.patch("/:id", validateUpdateTodo, todoController.update);
router.delete("/:id", todoController.delete);

module.exports = router;
