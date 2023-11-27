const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/:userId", reportController.createReport);

module.exports = router;
