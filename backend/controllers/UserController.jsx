require("dotenv").config();
const User = require("../models/User.jsx");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtSecret = process.env.SECRET_KEY;

//Generate user token

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

//Register user

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(422).json({ errors: ["Por favor, utilize outro email"] });
  }

  //Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });
  if (!newUser) {
    return res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde"],
    });
  }
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

//Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errors: ["Usuário não encontrado"] });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(422).json({ errors: ["Senha inválida"] });
    }
    res.status(200).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Erro interno do servidor"] });
  }
};

//Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

//Update user profile

const updateProfile = async (req, res) => {
  const { name, password, bio } = req.body;
  let profileImage = null;
  if (req.file) {
    profileImage = req.file.filename;
  }
  const reqUser = req.user;
  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id),
  ).select("-password");
  if (name) {
    user.name = name;
  }
  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }
  if (profileImage) {
    user.profileImage = profileImage;
  }
  if (bio) {
    user.bio = bio;
  }
  await user.save();
  res.status(200).json({ message: "Update realizado", user });
};
module.exports = {
  generateToken,
  register,
  login,
  getCurrentUser,
  updateProfile,
};
