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
 * @route GET api/goals/user/:userId
 * @description get list of Goals of user
 * @access log in required
 */

router.get("/", loginRequired, getGoals);

//Read
/**
 * @route GET api/goals/:goalId
 * @description get current Goal info
 * @access log in required
 */

router.get("/:goalId", loginRequired, getCurrentGoalInfo);

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
  validator.validate([
    body("name", "Missing name").exists().notEmpty(),
    body("targetDate", "Missing date").exists().notEmpty(),
  ]),
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
