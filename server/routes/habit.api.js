const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validator = require("../middlewares/validator.js");
const { loginRequired } = require("../middlewares/authenticator.js");

const {
  createHabit,
  getHabits,
  editHabit,
  deleteHabit,
  getCurrentHabitInfo,
} = require("../controllers/habit.controllers.js");

//Read
/**
 * @route GET api/Habits/user/:userId
 * @description get list of Habits
 * @access log in required
 */

router.get("/", loginRequired, getHabits);

//Read
/**
 * @route GET api/Habits/:habitId
 * @description get current habit info
 * @access log in required
 */

router.get("/:habitId", loginRequired, getCurrentHabitInfo);

//Create
/**
 * @route POST api/Habits
 * @description create a Habit
 * @access log in required
 */
router.post(
  "/",
  loginRequired,
  validator.validate([
    body("name", "Missing name").exists().notEmpty(),
    body("frequency", "Missing frequency").exists().notEmpty(),
  ]),
  createHabit
);

//Update
/**
 * @route PUT api/Habits/:habitId
 * @description update a Habit
 * @access log in required
 */
router.put("/:habitId", loginRequired, editHabit);

//Delete
/**
 * @route DELETE api/Habits/:habitId
 * @description delet a Habit
 * @access log in required
 */
router.delete("/:habitId", loginRequired, deleteHabit);

//export
module.exports = router;
