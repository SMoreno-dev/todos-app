const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../middleware/user-middleware");

router.post("/register", validateCreateUser, userController.create);
router.post("/login", userController.login);
router.patch("/:id", validateUpdateUser, userController.update);

module.exports = router;
