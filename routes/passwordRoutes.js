const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/passwordController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/", passwordController.createPassword);

router.get("/:id", passwordController.getPasswordById);

router.put("/:id", passwordController.updatePassword);

router.get("/", passwordController.getAllPasswords);

router.delete("/:id", passwordController.deletePassword);

router.post("/forgot-password", passwordController.forgotPassword);

router.post("/reset-password", passwordController.resetPassword);

module.exports = router;
