require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_KEY;
const User = require("../models/User.jsx");
const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }
  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = await User.findById(verified.id).select("-password");
    next();
  } catch {
    // Deliberately return a generic response so token verification details aren't exposed.
    res.status(401).json({ errors: ["Token inválido!"] });
  }
};

module.exports = authGuard;
