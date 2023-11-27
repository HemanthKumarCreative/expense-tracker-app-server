const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/passwordController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/forgot-password", passwordController.forgotPassword);

router.post("/reset-password", passwordController.resetPassword);

module.exports = router;
