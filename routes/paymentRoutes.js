const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const paymentSchema = require("../database/schemas/paymentSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  // tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(paymentSchema.createPaymentSchema),
  paymentController.createPayment
);

router.get(
  "/:id",
  // tokenValidation.validateToken,
  paymentController.getPaymentById
);

router.put(
  "/:id",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateBody(paymentSchema.updatePaymentSchema),
  paymentController.updatePayment
);

router.get(
  "/",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(paymentSchema.getAllPaymentsSchema),
  paymentController.getAllPayments
);

router.delete(
  "/:id",
  // tokenValidation.validateToken,
  paymentController.deletePayment
);
module.exports = router;
