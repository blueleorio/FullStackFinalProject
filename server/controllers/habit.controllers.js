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
  const total = 10;
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
      { habits: listOfFound, page: page, totalHabits: total },
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

// Assign a tag to a habit
habitController.assignTag = async (req, res, next) => {
  const { habitId, tagId } = req.params;
  try {
    const habitToUpdate = await habit.findById(habitId);
    if (!habitToUpdate) throw new AppError("Habit not found", 404);

    const tagToAssign = await tag.findById(tagId);
    if (!tagToAssign) throw new AppError("Tag not found", 404);

    // Add the tag to the habit's list of tags
    habitToUpdate.tags.push(tagToAssign._id);
    const updatedHabit = await habitToUpdate.save();

    sendResponse(
      res,
      200,
      true,
      { habit: updatedHabit },
      null,
      "Tag assigned to habit successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get habits for a specific date
habitController.getHabitsForDate = async (req, res, next) => {
  const { date } = req.params; // Date is passed as a URL parameter

  try {
    const habits = await habit.find();
    const dateObj = new Date(date);
    const habitsForDate = [];

    for (let habitItem of habits) {
      const { startDate, reminder } = habitItem;
      let nextDate = new Date(startDate);

      if (reminder === "Yearly") {
        while (nextDate <= dateObj) {
          nextDate.setFullYear(nextDate.getFullYear() + 1);
        }
      } else if (reminder === "Monthly") {
        while (nextDate <= dateObj) {
          nextDate.setMonth(nextDate.getMonth() + 1);
        }
      } else if (reminder === "Daily") {
        while (nextDate <= dateObj) {
          nextDate.setDate(nextDate.getDate() + 1);
        }
      } else if (reminder === "None") {
        nextDate = new Date(startDate);
      }

      if (nextDate.getTime() === dateObj.getTime()) {
        habitsForDate.push(habitItem);
      }
    }

    sendResponse(
      res,
      200,
      true,
      { habits: habitsForDate },
      null,
      "Get habits for date Successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = habitController;
