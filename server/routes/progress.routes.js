const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validator = require("../middlewares/validator.middlewares.js");
const {
  loginRequired,
} = require("../middlewares/authenticator.middlewares.js");

const {
  fetchProgressesById,
  fetchProgresses,
  fetchProgressesForDate,
} = require("../controllers/progress.controllers.js");

//Read
/**
 * @route GET api/goals/user/:userId
 * @description get list of Progress of user
 * @access log in required
 */

router.get("/", loginRequired, fetchProgresses);

//Read
/**
 * @route GET api/Progs/:ProgId
 * @description get current Prog info
 * @access log in required
 */

router.get("/:habitId", loginRequired, fetchProgressesById);

//Read
/**
 * @route GET api/Progs/:ProgId
 * @description get current Prog for current selected date
 * @access log in required
 */

router.get("/date/:date", loginRequired, fetchProgressesForDate);

//Create
/**
 * @route POST api/Progs
 * @description create a new Prog
 * @body {content, image}
 * @access public
 */

// router.post("/", loginRequired, createProg);

//Update
/**
 * @route PUT api/Progs/:ProgId
 * @description update a Prog
 * @access public
 */

// router.put(
//   "/:progId",
//   loginRequired,
//   validator.validate([
//     param("progId").exists().isString().custom(validator.checkObjectID),
//   ]),
//   editProg
// );

//Delete
/**
 * @route DELETE api/Progs/:ProgId
 * @description delete a Prog
 * @access public
 */

// router.delete("/:progId", loginRequired, deleteProg);

//export
module.exports = router;
