const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { checkToken } = require("../middlewares/index");
const {
  validateRegistration,
  validateLogin,
} = require("../middlewares/validation");

router.post("/signup", validateRegistration, authController.signup);
router.post("/login", validateLogin, authController.login);
router.post("/logout", checkToken, authController.logout);

module.exports = router;
