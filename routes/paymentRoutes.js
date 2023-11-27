const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/", paymentController.createPayment);

router.get("/:id", paymentController.getPaymentById);

router.put("/:id", paymentController.updatePayment);

router.get("/", paymentController.getAllPayments);

router.delete("/:id", paymentController.deletePayment);
module.exports = router;
