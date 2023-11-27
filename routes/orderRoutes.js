const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/collect-payment", orderController.collectPayment);

module.exports = router;
