const { sendResponse, AppError } = require("../helpers/utils.js");
const habit = require("../models/Habit.js");
const User = require("../models/User.js");
const Progress = require("../models/Progress.js");
const Goal = require("../models/Goal.js");
const dayjs = require("dayjs");

const habitController = {};
//! Create a habit


habitController.createHabit = async (req, res, next) => {
  try {
    const info = req.body;

    if (!info) throw new AppError(402, "Bad Request", "Create habit Error");

    info.tags = req.body.tags.map(tag => tag._id);
    // Create the new habit
    const created = await habit.create(info);
    console.log("🚀 ~ file: habit.controllers.js:21 ~ habitController.createHabit= ~ info:", info)

    // Calculate the dates

    // ! Weekly Case: repeat every week
    if (info.counter === "weekly") {
      const startDate = dayjs(info.startDate);
      const endDate = dayjs(info.endDate);
      const repeatOn = info.reminder.map((day) =>
        [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].indexOf(day)
      );

      for (
        let date = dayjs(startDate);
        date.isBefore(endDate) || date.isSame(endDate);
        date = date.add(1, "day")
      ) {
        if (repeatOn.includes(date.day())) {
          // Create a new progress document for each date
          const progress = new Progress({
            date: date.toDate(),
            habitId: created._id,
            createdBy: info.createdBy,
            // Add other fields as necessary
          });
          await progress.save();
        }
      }
    } else if (info.counter === "monthly") {
      // ! Monthly Case: repeat every month
      // Number of Month(s) repeat
      const numberOfMonthRepeat = info.repeat;
      // Date in Month
      const datesOfMonth = info.selectedDate;
      // Start from the current month
      let currentMonth = dayjs(info.startDate);

      // Repeat for the specified number of months
      for (let i = 0; i < numberOfMonthRepeat; i++) {
        // For each date in the month
        for (let date of datesOfMonth) {
          // Create a new date with the current month and the specified date
          let newDate = currentMonth.date(date);

          // If the date is greater than the last day of the month, set it to the last day of the month
          if (newDate.month() !== currentMonth.month()) {
            newDate = currentMonth.endOf("month");
          }

          // Create a new progress document for each date
          const progress = new Progress({
            date: newDate.toDate(),
            habitId: created._id,
            createdBy: info.createdBy,
            // Add other fields as necessary
          });
          await progress.save();
        }

        // Move to the next month
        currentMonth = currentMonth.add(1, "month");
      }
    } else if (info.counter === "yearly") {
      // ! Yearly Case: repeat every year

      // Number of Year(s) repeat
      const numberOfYearRepeat = info.repeat;
      // Date in Year
      const datesOfYear = dayjs(info.yearDate, "DD/MM/YYYY");

      // Start from the current Year
      let currentYear = dayjs(info.yearDate);

      // Repeat for the specified number of years
      for (let i = 0; i < numberOfYearRepeat; i++) {
        // Create a new date with the current year and the specified date
        let newDate = currentYear.date(datesOfYear.date());

        // Create a new progress document for each date
        const progress = new Progress({
          date: newDate.toDate(),
          habitId: created._id,
          createdBy: info.createdBy,
          // Add other fields as necessary
        });
        await progress.save();

        // Move to the next year
        currentYear = currentYear.add(1, "year");
      }
    }
    // add total habits
    const total = await habit.countDocuments({
      isDeleted: false,
      createdBy: info.createdBy,
    });

    // Find the user and update their habits field
    const user = await User.findById(info.createdBy);
    if (!user) throw new AppError(404, "Not Found", "User not found");
    user.habits.push(created._id);
    await user.save();

    sendResponse(
      res,
      200,
      true,
      { data: created, totalHabits: total },
      null,
      "Create habit Successfully"
    );
  } catch (err) {
    next(err);
  }
};
//!  Get all habit
habitController.getHabits = async (req, res, next) => {
  // const userId = req.userId;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const userId = req.userId;
  const filter = { isDeleted: false, createdBy: userId };
  try {
    const total = await habit.countDocuments(filter);
    const listOfFound = await habit
      .find(filter)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email -_id");
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

//! Get habit based on Name field

habitController.getHabitsBasedOnName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const habits = await habit.find({
      name: { $regex: new RegExp(name, "i") },
      isDeleted: false,
    });
    if (!habits) throw new AppError("No habits found with the given name", 404);
    sendResponse(
      res,
      200,
      true,
      { data: habits },
      null,
      "Get habits based on name successfully"
    );
  } catch (error) {
    next(error);
  }
};

//! Get current habit info
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
  if (!targetId) {
    return res.status(400).send({ error: "Habit id is required" });
  }
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
      { data: updated },
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

    // Delete associated progresses and goals
    await Progress.deleteMany({ habitId: targetId });
    await Goal.deleteMany({ habitId: targetId });

    // Count progress and goal
    const totalProgresses = await Progress.countDocuments();
    const totalGoals = await Goal.countDocuments({ isDeleted: false });
    sendResponse(
      res,
      200,
      true,
      { deleted: deleted._id, totalProgresses, totalGoals },
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
      { habit: habitsForDate },
      null,
      "Get habits for date Successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = habitController;
