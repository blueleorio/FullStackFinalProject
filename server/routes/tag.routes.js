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
} = require("../controllers/tag.controllers.js");

//Read
/**
 * @route GET api/tags
 * @description get list of tags
 * @access log in required
 */
router.get("/", loginRequired, getTags);

//Read
/**
 * @route GET api/tags/:tagId
 * @description get current tag info
 * @access log in required
 */
router.get("/:tagId", loginRequired, getCurrentTagInfo);

//Create
/**
 * @route POST api/tags
 * @description create a tag
 * @access log in required
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
 * @access log in required
 */
router.put("/:tagId", loginRequired, editTag);

//Delete
/**
 * @route DELETE api/tags/:tagId
 * @description delete a tag
 * @access log in required
 */
router.delete("/:tagId", loginRequired, deleteTag);

//export
module.exports = router;
