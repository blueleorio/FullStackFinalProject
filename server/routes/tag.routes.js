const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validator = require("../middlewares/validator.middlewares.js");
const {
  loginRequired,
} = require("../middlewares/authenticator.middlewares.js");

const {
  createTag,
  getTags,
  editTag,
  deleteTag,
  getCurrentTagInfo,
  getHabitGoalByTag,
} = require("../controllers/tag.controllers.js");

//Read
/**
 * @route GET api/tags
 * @description get list of tags
 * @access Login required
 */
router.get("/", loginRequired, getTags);

//Read
/**
 * @route GET api/tags/:tagId
 * @description get current tag info
 * @access Login required
 */
router.get("/:tagId", loginRequired, getCurrentTagInfo);

//Create
/**
 * @route POST api/tags
 * @description create a tag
 * @access Login required
 */
router.post(
  "/",
  loginRequired,
  validator.validate([body("name", "Missing name").exists().notEmpty()]),
  createTag
);

//Update
/**
 * @route PUT api/tags/:tagId
 * @description update a tag
 * @access Login required
 */
router.put("/:tagId", loginRequired, editTag);

//Delete
/**
 * @route DELETE api/tags/:tagId
 * @description delete a tag
 * @access Login required
 */
router.delete("/:tagId", loginRequired, deleteTag);

// Fetch habit and goal based on tag
/**
 * @route GET api/tags/:tagId/ habits-goals
 * @description get list of habit and goal with associated tag
 * @access Login required
 */

router.get("/:tagId/habits-goals", loginRequired, getHabitGoalByTag);

//export
module.exports = router;
