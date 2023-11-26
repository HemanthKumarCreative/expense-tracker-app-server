const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const expenseSchema = require("../database/schemas/expenseSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  // tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(expenseSchema.createExpenseSchema),
  expenseController.createExpense
);

// router.get(
//   "/:id",
//   // tokenValidation.validateToken,
//   expenseController.getExpenseById
// );

router.put(
  "/:id",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateBody(expenseSchema.updateExpenseSchema),
  expenseController.updateExpense
);

router.get(
  "/:userId",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(expenseSchema.getAllExpensesSchema),
  expenseController.getAllExpenses
);

router.delete(
  "/:id",
  // tokenValidation.validateToken,
  expenseController.deleteExpense
);
module.exports = router;
