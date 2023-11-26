const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const reportSchema = require("../database/schemas/reportSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/:userId",
  // tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(reportSchema.createReportSchema),
  reportController.createReport
);

router.get(
  "/:id",
  // tokenValidation.validateToken,
  reportController.getReportById
);

router.put(
  "/:id",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateBody(reportSchema.updateReportSchema),
  reportController.updateReport
);

router.get(
  "/",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(reportSchema.getAllReportsSchema),
  reportController.getAllReports
);

router.delete(
  "/:id",
  // tokenValidation.validateToken,
  reportController.deleteReport
);

module.exports = router;
