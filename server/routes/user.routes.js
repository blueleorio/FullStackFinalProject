const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const {
  loginRequired,
} = require("../middlewares/authenticator.middlewares.js");
const validator = require("../middlewares/validator.middlewares.js");

const {
  createUser,
  getUsers,
  getCurrentUser,
  editUser,
  deleteUser,
} = require("../controllers/user.controllers.js");

//Read
/**
 * @route GET api/User => from index.js routes
 * @description get list of Users
 * @access log in required
 */
router.get("/", loginRequired, getUsers);

/**
 * @route GET api/User/me => from index.js routes
 * @description get current User
 * @access log in required
 */
router.get("/me", loginRequired, getCurrentUser);

//Create
/**
 * @route POST api/User
 * @description create a User
 * @access public
 */
router.post(
  "/",
  validator.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),

  createUser
);

//Update
/**
 * @route PUT api/User
 * @description update a User
 * @access log in required
 */
router.put(
  "/:id",
  loginRequired,
  validator.validate([
    param("id").exists().isString().custom(validator.checkObjectID),
  ]),
  editUser
);

//Delete
/**
 * @route DELETE api/User
 * @description delete a User
 * @access public
 */
router.delete("/:id", loginRequired, deleteUser);

//export
module.exports = router;
