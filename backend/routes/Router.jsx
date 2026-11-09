const express = require("express");
const router = express.Router();
router.use("/api/users", require("./UserRoutes.jsx"));
router.get("/", (req, res) => {
  res.send("Hello World!");
});
module.exports = router;
