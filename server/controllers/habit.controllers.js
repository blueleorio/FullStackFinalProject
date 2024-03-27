const { sendResponse, AppError } = require("../helpers/utils.js");
const habit = require("../models/Habit.js");
const habitController = {};
//Create a habit

habitController.createHabit = async (req, res, next) => {
  try {
    const info = req.body;
    if (!info) throw new AppError(402, "Bad Request", "Create habit Error");
    const created = await habit.create(info);
    sendResponse(
      res,
      200,
      true,
      { habit: created },
      null,
      "Create habit Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get all habit
habitController.getHabits = async (req, res, next) => {
  const filter = {};
  try {
    const listOfFound = await habit.find(filter).limit(2);
    sendResponse(
      res,
      200,
      true,
      { habit: listOfFound, page: 1, total: 1192 },
      null,
      "Get Habit List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Update a habit
habitController.editHabit = async (req, res, next) => {
  const targetId = null;
  const updateInfo = "";
  const options = { new: true };
  try {
    const updated = await habit.findByIdAndUpdate(
      targetId,
      updateInfo,
      options
    );
    sendResponse(
      res,
      200,
      true,
      { habit: updated },
      null,
      "Update habit Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Delete a habit
habitController.deleteHabit = async (req, res, next) => {
  const targetId = null;
  try {
    const deleted = await habit.findByIdAndDelete(targetId);
    sendResponse(
      res,
      200,
      true,
      { habit: deleted },
      null,
      "Delete habit Successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = habitController;
