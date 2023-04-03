const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// signup
router.post("/login", userController.loginUser);

// login
router.post("/signup", userController.signupUser);

module.exports = router;
