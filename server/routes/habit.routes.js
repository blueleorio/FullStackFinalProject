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
  getHabitsBasedOnName,
} = require("../controllers/habit.controllers.js");

//Read
/**
 * @route GET api/Habits/user/:userId
 * @description get list of Habits
 * @access Login required
 */

router.get("/", loginRequired, getHabits);

//Read
/**
 * @route GET api/habits/search?name=:name
 * @description get list of goal based on name
 * @access Login required
 */

router.get("/search", loginRequired, getHabitsBasedOnName);

//Read
/**
 * @route GET api/Habits/:habitId
 * @description get current habit info
 * @access Login required
 */

router.get("/:habitId", loginRequired, getCurrentHabitInfo);

//Create
/**
 * @route POST api/Habits
 * @description create a Habit
 * @access Login required
 */
router.post(
  "/",
  loginRequired,
  validator.validate([body("name", "Missing name").exists().notEmpty()]),
  createHabit
);

//Update
/**
 * @route PUT api/Habits/:habitId
 * @description update a Habit
 * @access Login required
 */
router.put(
  "/:habitId",
  loginRequired,
  validator.validate([
    param("habitId").exists().isString().custom(validator.checkObjectID),
  ]),
  editHabit
);

//Delete
/**
 * @route DELETE api/Habits/:habitId
 * @description delete a Habit
 * @access Login required
 */
router.delete("/:habitId", loginRequired, deleteHabit);

//Assign Tag
/**
 * @route PUT api/Habits/:habitId/tags/:tagId
 * @description assign a tag to a habit
 * @access Login required
 */
router.put("/habits/:habitId/tags/:tagId", assignTag);

//Filter
/**
 * @route GET api/Habits/filter
 * @description filter habits based on tag
 * @access Login required
 */
router.get("/filter", loginRequired, filterHabit);

// Get Habits for Date
/**
 * @route GET api/Habits/date/:date
 * @description get list of Habits for a specific date
 * @access Login required
 */
router.get("/date/:date", loginRequired, getHabitsForDate);

//export
module.exports = router;
