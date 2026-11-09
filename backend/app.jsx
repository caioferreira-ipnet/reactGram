require("dotenv").config();
const express = require("express");
const app = express();
app.disable("x-powered-by");
const port = process.env.PORT;
const cors = require("cors");
const path = require("node:path");

const connectDB = require("./config/db.js");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.ORIGIN }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const router = require("./routes/Router.jsx");
app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
