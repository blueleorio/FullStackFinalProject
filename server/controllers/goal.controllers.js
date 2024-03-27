const { sendResponse, AppError } = require("../helpers/utils.js");
const Goal = require("../models/Goal");
const goalController = {};
//Create a goal

goalController.createGoal = async (req, res, next) => {
  try {
    const info = req.body;
    if (!info) throw new AppError(402, "Bad Request", "Create goal Error");
    const created = await Goal.create(info);
    sendResponse(
      res,
      200,
      true,
      { goal: created },
      null,
      "Create goal Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get all goal
goalController.getGoals = async (req, res, next) => {
  const filter = {};
  try {
    const listOfFound = await Goal.find(filter).limit(2);
    sendResponse(
      res,
      200,
      true,
      { goal: listOfFound, page: 1, total: 1192 },
      null,
      "Get Goal List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Update a goal
goalController.editGoal = async (req, res, next) => {
  const targetId = null;
  const updateInfo = "";
  const options = { new: true };
  try {
    const updated = await Goal.findByIdAndUpdate(targetId, updateInfo, options);
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
  const targetId = null;
  try {
    await Goal.findByIdAndDelete(targetId);
    sendResponse(res, 200, true, null, null, "Delete goal Successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = goalController;
