const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo-controller");

router.post("/", todoController.create);
router.get("/", todoController.list);
router.patch("/:id", todoController.update);
router.delete("/:id", todoController.delete);

module.exports = router;
