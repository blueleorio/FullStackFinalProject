const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { loginRequired } = require("../middlewares/authenticator.js");
const validator = require("../middlewares/validator.js");

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
 * @access public
 */
router.get("/", loginRequired, getUsers);

//Create
/**
 * @route POST api/User
 * @description create a User
 * @access public
 */
router.post(
  "/",
  validator.validate([
    body("username", "Invalid name").exists().notEmpty(),
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
 * @access public
 */
router.put("/:id", loginRequired, editUser).env;

//Delete
/**
 * @route DELETE api/User
 * @description delet a User
 * @access public
 */
router.delete("/:id", loginRequired, deleteUser);

//export
module.exports = router;
