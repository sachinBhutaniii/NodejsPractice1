const router = require("express").Router();

// if person logged in is a admin
router.get("/", (req, res) => {
  res.send("Welcome to admin Dashboard");
});

module.exports = router;
