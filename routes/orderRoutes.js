const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const orderSchema = require("../database/schemas/orderSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/create-order",
  // tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(orderSchema.createOrderSchema),
  orderController.createOrder
);

router.post(
  "/collect-payment",
  // tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(orderSchema.createOrderSchema),
  orderController.collectPayment
);

router.get(
  "/:id",
  //  tokenValidation.validateToken,
  orderController.getOrderById
);

router.put(
  "/:id",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateBody(orderSchema.updateOrderSchema),
  orderController.updateOrder
);

router.get(
  "/",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(orderSchema.getAllOrdersSchema),
  orderController.getAllOrders
);

router.delete(
  "/:id",
  // tokenValidation.validateToken,
  orderController.deleteOrder
);
module.exports = router;
