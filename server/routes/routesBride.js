const express = require("express");
const router = express.Router();
// const Multer = require("multer");
// const upload = multer();
// const {
//   getPublicUrl,
//   sendUploadToGCS,
//   multer
// } = require("../helper/google-cloud-storages.js");
// const Controller = require("../controller/bride.js");
//
// router.post(
//   "/upload",
//   multer.single("image"),
//   sendUploadToGCS,
//   (req, res, next) => {
//     res.send({
//       status: 200,
//       link: req.file.cloudStoragePublicUrl
//     });
//   }
// );

const Multer = require("multer");
const gcsMiddlewares = require("../middleware/google-cloud-storage.js");

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Maximum file size is 10MB
  }
});

router.post(
  "/upload",
  multer.single("image"),
  gcsMiddlewares.sendUploadToGCS,
  (req, res, next) => {
    if (req.file && req.file.gcsUrl) {
      return res.send(req.file.gcsUrl);
    }

    return res.status(500).send("Unable to upload");
  }
);
// router.post("/generatecard", Controller.upload);

router.use((err, req, res, next) => {
  console.log(err, "ini error");
  if (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
