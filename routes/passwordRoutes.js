const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/passwordController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const passwordSchema = require("../database/schemas/passwordSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateBody(passwordSchema.createPasswordSchema),
  passwordController.createPassword
);

router.get(
  "/:id",
  // tokenValidation.validateToken,
  passwordController.getPasswordById
);

router.put(
  "/:id",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateBody(passwordSchema.updatePasswordSchema),
  passwordController.updatePassword
);

router.get(
  "/",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(passwordSchema.getAllPasswordsSchema),
  passwordController.getAllPasswords
);

router.delete(
  "/:id",
  // tokenValidation.validateToken,
  passwordController.deletePassword
);

module.exports = router;
