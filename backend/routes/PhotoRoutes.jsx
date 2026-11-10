const express = require("express");
const router = express.Router();

// Controllers
const {
  insertPhoto,
  deletePhoto,
} = require("../controllers/PhotoController.jsx");

// Middlewares
const { photoValidations } = require("../middlewares/photoValidations.jsx");
const authGuard = require("../middlewares/AuthGuard.jsx");
const validate = require("../middlewares/handleValidations.jsx");
const { imageUpload } = require("../middlewares/ImageUploads.jsx");

// Routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoValidations(),
  validate,
  insertPhoto,
);

router.delete("/:id", authGuard, deletePhoto);

module.exports = router;
