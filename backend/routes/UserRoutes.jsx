const express = require("express");
const router = express.Router();

//Controllers

const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  getUserById,
} = require("../controllers/UserController.jsx");
//Middlewares
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidations.jsx");
const validate = require("../middlewares/handleValidations.jsx");
const authGuard = require("../middlewares/AuthGuard.jsx");
const { imageUpload } = require("../middlewares/ImageUploads.jsx");
//Routes
//Register
router.post("/register", userCreateValidation(), validate, register);

//Login
router.post("/login", loginValidation(), validate, login);

//Profile
router.get("/profile", authGuard, getCurrentUser);

//Update Profile
router.put(
  "/profile",
  authGuard,
  imageUpload.single("profileImage"),
  userUpdateValidation(),
  validate,
  updateProfile,
);

//Get by id
router.get("/:id", getUserById);

module.exports = router;
