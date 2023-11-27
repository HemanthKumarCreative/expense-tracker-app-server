const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

router.get("/", userController.getAllUsers);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

module.exports = router;
