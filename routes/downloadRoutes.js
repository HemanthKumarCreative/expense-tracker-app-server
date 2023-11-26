const express = require("express");
const router = express.Router();
const downloadController = require("../controllers/downloadController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const downloadSchema = require("../database/schemas/downloadSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  // tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(downloadSchema.createDownloadSchema),
  downloadController.createDownload
);

// router.get(
//   "/:id",
//   // tokenValidation.validateToken,
//   downloadController.getDownloadById
// );

router.put(
  "/:id",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateBody(downloadSchema.updateDownloadSchema),
  downloadController.updateDownload
);

router.get(
  "/:userId",
  // tokenValidation.validateToken,
  // joiSchemaValidation.validateQueryParams(downloadSchema.getAllDownloadsSchema),
  downloadController.getAllDownloads
);

router.delete(
  "/:id",
  // tokenValidation.validateToken,
  downloadController.deleteDownload
);

module.exports = router;
