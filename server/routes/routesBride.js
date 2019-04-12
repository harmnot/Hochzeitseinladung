const express = require("express"),
  router = express.Router(),
  Multer = require("multer"),
  gcsMiddlewares = require("../middleware/google-cloud-storage.js");

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
    console.log(req.file, "ini req file");
    if (req.file && req.file.gcsUrl) {
      res.send(req.file.gcsUrl);
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
