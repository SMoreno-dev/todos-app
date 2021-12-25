const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../middleware/user-middleware");
const authentication = require("../middleware/authentication");

router.post("/register", validateCreateUser, userController.create);
router.post("/login", userController.login);
router.patch("/:id", authentication, validateUpdateUser, userController.update);

module.exports = router;
