const express = require("express");
const router = express.Router();
const downloadController = require("../controllers/downloadController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/", downloadController.createDownload);

router.get("/:userId", downloadController.getAllDownloads);

module.exports = router;
