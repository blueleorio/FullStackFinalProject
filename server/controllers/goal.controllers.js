const { sendResponse, AppError } = require("../helpers/utils.js");
const goal = require("../models/Goal.js");
const User = require("../models/User.js");
const goalController = {};
//Create a goal

goalController.createGoal = async (req, res, next) => {
  try {
    const info = req.body;
    console.log("🚀 ~ goalController.createGoal= ~ req.body:", req.body);

    if (!info) throw new AppError(402, "Bad Request", "Create goal Error");

    // create the new goal
    const created = await goal.create(info);

    // Find the user and update their habits field
    const user = await User.findById(info.createdBy);
    if (!user) throw new AppError(404, "Not Found", "User not found");
    user.habits.push(created._id);
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
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = { isDeleted: false };
  const total = 20;
  try {
    const listOfFound = await goal
      .find(filter)
      .skip(skip)
      .limit(limit)
      .populate("userId");
    if (!listOfFound) throw new AppError("No goal found", 404);
    sendResponse(
      res,
      200,
      true,
      { goal: listOfFound, page: page, total: total },
      null,
      "Get Goal List Successfully!"
    );
  } catch (err) {
    next(err);
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
      { goal: updated },
      null,
      "Update goal Successfully"
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
