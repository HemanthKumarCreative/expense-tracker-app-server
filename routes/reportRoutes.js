const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/:userId", reportController.createReport);

router.get("/:id", reportController.getReportById);

router.put("/:id", reportController.updateReport);

router.get("/", reportController.getAllReports);

router.delete("/:id", reportController.deleteReport);

module.exports = router;
