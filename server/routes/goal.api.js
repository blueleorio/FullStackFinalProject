const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validator = require("../middlewares/validator.js");
const { loginRequired } = require("../middlewares/authenticator.js");

const {
  createGoal,
  getGoals,
  editGoal,
  deleteGoal,
  getCurrentGoalInfo,
} = require("../controllers/goal.controllers.js");

//Read
/**
 * @route GET api/Goal/user/:userId
 * @description get list of Goals of user
 * @access log in required
 */

router.get("/", loginRequired, getGoals);

//Read
/**
 * @route GET api/Goal/:goalId
 * @description get current Goal info
 * @access log in required
 */

router.get("/:goalId", loginRequired, getCurrentGoalInfo);

//Create
/**
 * @route POST api/Goal
 * @description create a new Goal
 * @body {content, image}
 * @access public
 */

router.post(
  "/",
  loginRequired,
  validator.validate([
    body("name", "Missing name").exists().notEmpty(),
    body("targetDate", "Missing date").exists().notEmpty(),
  ]),
  createGoal
);

//Update
/**
 * @route PUT api/Goal
 * @description update a Goal
 * @access public
 */

router.put("/:goalId", loginRequired, editGoal);

//Delete
/**
 * @route DELETE api/Goal
 * @description delet a Goal
 * @access public
 */

router.delete("/:goalId", loginRequired, deleteGoal);

//export
module.exports = router;
