import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<center><h1>Server Running</h1></center>");
});

export default router;
