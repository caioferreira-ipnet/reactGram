const express = require("express");
const router = express.Router();
router.use("/api/users", require("./UserRoutes.jsx"));
router.use("/api/photos", require("./PhotoRoutes.jsx"));
router.get("/", (req, res) => {
  res.send("Hello World!");
});
module.exports = router;
