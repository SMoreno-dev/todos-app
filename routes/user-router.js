const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.post("/register", userController.create);
router.post("/login", userController.login);
router.patch("/:id", userController.update);

module.exports = router;
