const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/", userController.createUser);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

router.get("/", userController.getAllUsers);

router.delete("/:id", userController.deleteUser);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

module.exports = router;
