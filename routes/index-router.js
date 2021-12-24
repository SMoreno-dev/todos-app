const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<center><h1>Server Running</h1></center>");
});

module.exports = router;
