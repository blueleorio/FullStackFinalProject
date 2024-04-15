const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validator = require("../middlewares/validator.middlewares.js");
const {
  loginRequired,
} = require("../middlewares/authenticator.middlewares.js");

const {
  createHabit,
  getHabits,
  editHabit,
  deleteHabit,
  getCurrentHabitInfo,
  assignTag,
  filterHabit,
  getHabitsForDate,
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
    // body("frequency", "Missing frequency").exists().notEmpty(),
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
 * @description delete a Habit
 * @access log in required
 */
router.delete("/:habitId", loginRequired, deleteHabit);

//Assign Tag
/**
 * @route PUT api/Habits/:habitId/tags/:tagId
 * @description assign a tag to a habit
 * @access log in required
 */
router.put("/habits/:habitId/tags/:tagId", assignTag);

//Filter
/**
 * @route GET api/Habits/filter
 * @description filter habits based on tag
 * @access log in required
 */
router.get("/filter", loginRequired, filterHabit);

// Get Habits for Date
/**
 * @route GET api/Habits/date/:date
 * @description get list of Habits for a specific date
 * @access log in required
 */
router.get("/date/:date", loginRequired, getHabitsForDate);

//export
module.exports = router;
