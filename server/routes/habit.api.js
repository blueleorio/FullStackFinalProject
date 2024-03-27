const express = require("express");
const router = express.Router();
// const { validationResult } = require("express-validator");

const {
  createHabit,
  getHabits,
  editHabit,
  deleteHabit,
} = require("../controllers/habit.controllers.js");

//Read
/**
 * @route GET api/Habit
 * @description get list of Habits
 * @access public
 */

router.get("/", getHabits);

//Create
/**
 * @route POST api/Habit
 * @description create a Habit
 * @access public
 */
router.post("/", createHabit);

//Update
/**
 * @route PUT api/Habit
 * @description update a Habit
 * @access public
 */
router.put("/:id", editHabit);

//Delete
/**
 * @route DELETE api/Habit
 * @description delet a Habit
 * @access public
 */
router.delete("/:id", deleteHabit);

//export
module.exports = router;
