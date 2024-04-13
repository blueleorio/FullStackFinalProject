const { sendResponse, AppError } = require("../helpers/utils.js");
const habit = require("../models/Habit.js");
const user = require("../models/User.js");
const habitController = {};
//Create a habit

//!TODO: add assign userId to the HabitID as well as the Goal ID

habitController.createHabit = async (req, res, next) => {
  try {
    const info = req.body;
    console.log("🚀 ~ habitController.createHabit= ~ req.body:", req.body);
    if (!info) throw new AppError(402, "Bad Request", "Create habit Error");
    const created = await habit.create(info);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create habit Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get all habit
habitController.getHabits = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = { isDeleted: false };
  const total = 20;
  try {
    const listOfFound = await habit
      .find(filter)
      .skip(skip)
      .limit(limit)
      .populate("userId");
    if (!listOfFound) throw new AppError("No habit found", 404);
    sendResponse(
      res,
      200,
      true,
      { habit: listOfFound, page: page, total: total },
      null,
      "Get Habit List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};
// Get current habit info
habitController.getCurrentHabitInfo = async (req, res, next) => {
  const targetId = req.params.habitId;

  try {
    const habitInfo = await habit.findOne({ _id: targetId, isDeleted: false });
    if (!habitInfo) throw new AppError("habit not found", 404);
    sendResponse(
      res,
      200,
      true,
      { habitInfo },
      null,
      "Get habit info Successfully"
    );
  } catch (error) {
    next(error);
  }
};
// Update a habit
habitController.editHabit = async (req, res, next) => {
  const targetId = req.params.habitId;
  const updateInfo = req.body;
  const options = { new: true };
  try {
    const habits = await habit.findById(targetId);
    if (habits.isDeleted) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Cannot update a deleted habit",
        "Update failed"
      );
    }
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
  const targetId = req.params.habitId;
  const options = { new: true, isDeleted: true, deletedAt: new Date() };
  try {
    const deleted = await habit.findByIdAndUpdate(targetId, options);
    if (!deleted) throw new AppError("Habit not found", 404);
    sendResponse(
      res,
      200,
      true,
      { deleted },
      null,
      "Delete habit Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Filter habit based on tag
habitController.filterHabit = async (req, res, next) => {
  const tag = req.query.tag;
  const filter = { tags: tag, isDeleted: false };
  try {
    const filtered = await habit.find(filter);
    if (!filtered) throw new AppError("No habit found", 404);
    sendResponse(
      res,
      200,
      true,
      { habit: filtered },
      null,
      "Filter habit Successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = habitController;
