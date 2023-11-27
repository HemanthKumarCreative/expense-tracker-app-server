const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/", expenseController.createExpense);

router.get("/:userId", expenseController.getAllExpenses);

router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
