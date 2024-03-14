const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HIT THE AUTH ROUTE");
});

module.exports = router;
