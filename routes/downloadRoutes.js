const express = require("express");
const router = express.Router();
const downloadController = require("../controllers/downloadController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/", downloadController.createDownload);

router.put("/:id", downloadController.updateDownload);

router.get("/:userId", downloadController.getAllDownloads);

router.delete("/:id", downloadController.deleteDownload);

module.exports = router;
