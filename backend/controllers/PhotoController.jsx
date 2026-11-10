const Photo = require("../models/Photo.jsx");
const mongoose = require("mongoose");
const User = require("../models/User.jsx");
//Insert photos, with an user related to it

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um erro ao salvar imagem"],
    });
    return;
  }
  res.status(201).json(newPhoto);
};

//Delete photo
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada"] });
    }

    if (!photo.userId.equals(reqUser._id)) {
      return res.status(422).json({
        errors: ["Houve um erro interno, tente novamente mais tarde!"],
      });
    }

    await Photo.findByIdAndDelete(photo._id);

    return res.status(200).json({
      id: photo._id,
      message: "Foto excluída com sucesso.",
    });
  } catch {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
};
