const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validator = require("../middlewares/validator.js");
const { loginRequired } = require("../middlewares/authenticator.js");

const {} = require("../controllers/progress.controllers.js");

//Read
/**
 * @route GET api/goals/user/:userId
 * @description get list of Goals of user
 * @access log in required
 */

router.get("/", loginRequired, getProgs);

//Read
/**
 * @route GET api/Progs/:ProgId
 * @description get current Prog info
 * @access log in required
 */

router.get("/:progId", loginRequired, getCurrentProgInfo);

//Create
/**
 * @route POST api/Progs
 * @description create a new Prog
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
  createProg
);

//Update
/**
 * @route PUT api/Progs/:ProgId
 * @description update a Prog
 * @access public
 */

router.put(
  "/:progId",
  loginRequired,
  validator.validate([
    param("progId").exists().isString().custom(validator.checkObjectID),
  ]),
  editProg
);

//Delete
/**
 * @route DELETE api/Progs/:ProgId
 * @description delete a Prog
 * @access public
 */

router.delete("/:progId", loginRequired, deleteProg);

//export
module.exports = router;