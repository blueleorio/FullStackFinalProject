const express = require("express");
const router = express.Router();
const { loginWithEmail } = require("../controllers/auth.controllers.js");
const { body } = require("express-validator");
const validator = require("../middlewares/validator.js");
/**
 * @route POST api/auth/login
 * @description log in with email and password
 * @body {email, password}
 * @access Public
 */

router.post(
  "/login",
  validator.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  loginWithEmail
);

module.exports = router;
