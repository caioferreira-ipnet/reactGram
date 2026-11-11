const express = require("express");
const router = express.Router();

// Controllers
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
} = require("../controllers/PhotoController.jsx");

// Middlewares
const { photoValidations } = require("../middlewares/photoValidations.jsx");
const authGuard = require("../middlewares/AuthGuard.jsx");
const validate = require("../middlewares/handleValidations.jsx");
const { imageUpload } = require("../middlewares/ImageUploads.jsx");

// Routes
//Insert photo
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoValidations(),
  validate,
  insertPhoto,
);
//Delete photo
router.delete("/:id", authGuard, deletePhoto);
//Get all Photos
router.get("/", authGuard, getAllPhotos);
module.exports = router;
