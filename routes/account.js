const express = require("express");
const { users } = require("../temporalDB");
const router = express.Router();

router.get("/", (req, res) => {
  const user = users.find((u) => u.username == req.user.username);
  res.send(user.account);
});

module.exports = router;
