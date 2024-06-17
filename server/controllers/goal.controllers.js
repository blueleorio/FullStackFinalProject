const { sendResponse, AppError } = require("../helpers/utils.js");
const goal = require("../models/Goal.js");
const User = require("../models/User.js");
const Habit = require("../models/Habit.js");
const Progress = require("../models/Progress.js");
const dayjs = require("dayjs");

const goalController = {};
//Create a goal

goalController.createGoal = async (req, res, next) => {
  try {
    const info = req.body;
    if (!info) throw new AppError(402, "Bad Request", "Create goal Error");
    info.tags = req.body.tags.map(tag => tag._id);

    // create the new goal
    const created = await goal.create(info);


    // Find the user and update their goals field
    const user = await User.findById(info.createdBy);
    if (!user) throw new AppError(404, "Not Found", "User not found");
    user.goals.push(created._id);
    await user.save();

    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create Goal Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get all goal
goalController.fetchGoals = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const userID = req.userId; // Get the userId from the request
  const filter = { isDeleted: false, createdBy: userID };
  try {
    const total = await goal.countDocuments(filter);
    const listOfFound = await goal
      .find(filter)
      .skip(skip)
      .limit(limit)
      .populate("createdBy");
    if (!listOfFound) throw new AppError("No goal found", 404);
    sendResponse(
      res,
      200,
      true,
      { goals: listOfFound, page: page, totalGoals: total },
      null,
      "Get Goal List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

//! Get goal based on Name field
goalController.getGoalsBasedOnName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const goals = await goal.find({
      name: { $regex: new RegExp(name, "i") },
      isDeleted: false,
    });
    if (!goals) throw new AppError("No goals found with the given name", 404);
    sendResponse(
      res,
      200,
      true,
      { data: goals },
      null,
      "Get goals based on name successfully"
    );
  } catch (error) {
    next(error);
  }
};

// Get current goal info
goalController.getCurrentGoalInfo = async (req, res, next) => {
  const targetId = req.params.goalId;

  try {
    const goalInfo = await goal.findOne({ _id: targetId, isDeleted: false });
    if (!goalInfo) throw new AppError("Goal not found", 404);
    sendResponse(
      res,
      200,
      true,
      { goalInfo },
      null,
      "Get goal info Successfully"
    );
  } catch (error) {
    next(error);
  }
};

// Update a goal
goalController.editGoal = async (req, res, next) => {
  const targetId = req.params.goalId;
  const updateInfo = req.body;
  const options = { new: true };
  try {
    const goals = await goal.findById(targetId);
    if (goals.isDeleted) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Cannot update a deleted goal",
        "Update failed"
      );
    }
    const updated = await goal.findByIdAndUpdate(targetId, updateInfo, options);
    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Update goal Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Goal Percentage

goalController.calculateProgress = async (req, res, next) => {
  try {
    const { goalId } = req.params;

    const goalFound = await goal.findById(goalId);

    const habitId = goalFound.habitId;

    const { startDate, endDate, counter, repeat } = goalFound;

    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    let progressDocuments = [], totalProgress;

    switch (counter) {
      case "weekly":
        // Fetch all progress documents associated with the habitId
        progressDocuments = await Progress.find({ habitId, date: { $gte: startOfDay, $lte: endOfDay } });

        // Count the total number of progress documents
        totalProgress = progressDocuments.length;

        break;
      case "monthly":

        progressDocuments = await Progress.find({ habitId });
        totalProgress = repeat;

        break;
      case "yearly":
        // Adjust start and end dates for yearly calculation
        progressDocuments = await Progress.find({ habitId });
        totalProgress = repeat;
        break;
      default:
        progressDocuments = [];
    }
    // Count the number of progress documents where isDone is true
    const doneProgress = progressDocuments.filter(
      (progress) => progress.isDone
    ).length;

    // Calculate the percentage
    let percentageDone = (doneProgress / totalProgress) * 100;

    // Ensure the percentage does not exceed 100%
    percentageDone = Math.min(percentageDone, 100);

    // Update the percentage field in the Goal model
    await goal.findByIdAndUpdate(goalId, { percentage: percentageDone });

    sendResponse(
      res,
      200,
      true,
      { percent: percentageDone, totalProgress, doneProgress },
      null,
      "Progress percentage calculated successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Delete a goal
goalController.deleteGoal = async (req, res, next) => {
  const targetId = req.params.goalId;
  const options = { isDeleted: true, deletedAt: new Date(), new: true };
  try {
    const deleted = await goal.findByIdAndUpdate(targetId, options);
    if (!deleted) throw new AppError("Goal not found", 404);

    sendResponse(res, 200, true, { deleted }, null, "Delete goal Successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = goalController;
