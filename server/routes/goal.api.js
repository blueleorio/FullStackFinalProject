const express = require("express");
const router = express.Router();

const {
  createGoal,
  getGoals,
  editGoal,
  deleteGoal,
} = require("../controllers/goal.controllers.js");

//Read
/**
 * @route GET api/Goal
 * @description get list of Goals
 * @access public
 */

router.get("/", getGoals);

//Create
/**
 * @route POST api/Goal
 * @description create a Goal
 * @access public
 */

router.post("/", createGoal);

//Update
/**
 * @route PUT api/Goal
 * @description update a Goal
 * @access public
 */

router.put("/:id", editGoal);

//Delete
/**
 * @route DELETE api/Goal
 * @description delet a Goal
 * @access public
 */

router.delete("/:id", deleteGoal);

//export
module.exports = router;
