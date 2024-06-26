const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validator = require("../middlewares/validator.middlewares.js");
const {
  loginRequired,
} = require("../middlewares/authenticator.middlewares.js");

const {
  createGoal,
  fetchGoals,
  editGoal,
  deleteGoal,
  getCurrentGoalInfo,
  getGoalsBasedOnName,
  calculateProgress,
} = require("../controllers/goal.controllers.js");

//Read
/**
 * @route GET api/goals/user/:userId
 * @description get list of Goals of user
 * @access Login required
 */

router.get("/", loginRequired, fetchGoals);

//Read
/**
 * @route GET api/goals/search?name=:name
 * @description get list of goal based on name
 * @access Login required
 */

router.get("/search", loginRequired, getGoalsBasedOnName);

//Read
/**
 * @route GET api/goals/:goalId
 * @description get current Goal info
 * @access Login required
 */

router.get("/:goalId", loginRequired, getCurrentGoalInfo);

//Read
/**
 * @route GET api/goals/:goalId
 * @description get current Goal percentage
 * @access Login required
 */

router.get("/:goalId/calculate", loginRequired, calculateProgress);

//Create
/**
 * @route POST api/Goals
 * @description create a new Goal
 * @body {content, image}
 * @access public
 */

router.post(
  "/",
  loginRequired,
  validator.validate([body("name", "Missing name").exists().notEmpty()]),
  createGoal
);

//Update
/**
 * @route PUT api/Goals/:goalId
 * @description update a Goal
 * @access public
 */

router.put(
  "/:goalId",
  loginRequired,
  validator.validate([
    param("goalId").exists().isString().custom(validator.checkObjectID),
  ]),
  editGoal
);

//Delete
/**
 * @route DELETE api/Goals/:goalId
 * @description delete a Goal
 * @access public
 */

router.delete("/:goalId", loginRequired, deleteGoal);

//export
module.exports = router;
