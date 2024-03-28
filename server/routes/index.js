const { sendResponse, AppError } = require("../helpers/utils.js");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to CoderSchool!");
});

router.get("/template/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    //turn on to test error handling
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (err) {
    next(err);
  }
});

// Auth API
// const authRouter = require("./auth.api.js");
// router.use("/auth", authRouter);

// User API
const userRouter = require("./user.api.js");
router.use("/user", userRouter);

// Habit API
const habitRouter = require("./habit.api.js");
router.use("/habit", habitRouter);

// Goal API
const goalRouter = require("./goal.api.js");
router.use("/goal", goalRouter);

module.exports = router;
