const { sendResponse, AppError } = require("../helpers/utils.js");
const express = require("express");
const router = express.Router();

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
const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter);

// User API
const userRouter = require("./user.routes.js");
router.use("/users", userRouter);

// Habit API
const habitRouter = require("./habit.routes.js");
router.use("/habits", habitRouter);

// Goal API
const goalRouter = require("./goal.routes.js");
router.use("/goals", goalRouter);

// Progress API
const progressRouter = require("./progress.routes.js");
router.use("/progresses", progressRouter);
// Tag API
const tagRouter = require("./tag.routes.js");
router.use("/tags", tagRouter);

module.exports = router;
