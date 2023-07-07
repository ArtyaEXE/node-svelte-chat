const { body } = require("express-validator");

const validateRegistration = [
  body("username").trim().notEmpty().withMessage("Login is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

const validateLogin = [
  body("username").trim().notEmpty().withMessage("Login is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

module.exports = {
  validateRegistration,
  validateLogin,
};
