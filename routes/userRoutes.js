const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const userSchema = require("../database/schemas/userSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateBody(userSchema.createUserSchema),
  userController.createUser
);

router.get(
  "/:id",
  // tokenValidation.validateToken,
  userController.getUserById
);

router.put(
  "/:id",
  // tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(userSchema.updateUserSchema),
  userController.updateUser
);

router.get(
  "/",
  // tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(userSchema.getAllUsersSchema),
  userController.getAllUsers
);

router.delete("/:id", tokenValidation.validateToken, userController.deleteUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
