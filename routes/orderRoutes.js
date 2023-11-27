const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/create-order", orderController.createOrder);

router.post("/collect-payment", orderController.collectPayment);

router.get("/:id", orderController.getOrderById);

router.put("/:id", orderController.updateOrder);

router.get("/", orderController.getAllOrders);

router.delete("/:id", orderController.deleteOrder);
module.exports = router;
