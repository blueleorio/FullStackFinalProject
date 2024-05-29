const { sendResponse, AppError } = require("../helpers/utils.js");
const progress = require("../models/Progress.js");

const progressController = {};

//Create a progress
progressController.createProgress = async (req, res, next) => {
  try {
    const info = req.body;
    if (!info) throw new AppError(402, "Bad Request", "Create progress Error");
    const created = await progress.create(info);

    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create Progress Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Fetch progresses by Id
progressController.fetchProgressesById = async (req, res, next) => {
  try {
    const { habitId } = req.query;
    if (!habitId) throw new AppError(400, "Bad Request", "No habitId provided");

    const progresses = await progress.find({ habitId });

    sendResponse(
      res,
      200,
      true,
      { data: progresses },
      null,
      "Fetch Progresses Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Fetch progresses (limit 30)
progressController.fetchProgresses = async (req, res, next) => {
  try {
    const progresses = await progress.find().populate("habitId").limit(30);

    sendResponse(
      res,
      200,
      true,
      { data: progresses },
      null,
      "Fetch Progresses Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Fetch progress for a specific date
progressController.fetchProgressesForDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    console.log(
      "🚀 ~ file: progress.controllers.js:69 ~ progressController.fetchProgressesForDate= ~ date:",
      date
    );
    // date: 2024-05-23 -> from FRONTEND

    // Convert the date string to a Date object
    const dateObj = new Date(date);

    // Convert the date to the start and end of the day in UTC
    const startOfDay = new Date(
      Date.UTC(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
        0,
        0,
        0,
        0
      )
    );
    const endOfDay = new Date(
      Date.UTC(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
        23,
        59,
        59,
        999
      )
    );

    // Fetch the progress documents for the given date
    const progresses = await progress
      .find({
        date: {
          $gte: startOfDay.toISOString(),
          $lt: endOfDay.toISOString(),
        },
      })
      .populate("habitId");

    sendResponse(
      res,
      200,
      true,
      { data: progresses },
      null,
      "Fetch Progresses Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Update a progress
progressController.updateProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) throw new AppError(400, "Bad Request", "No id provided");
    if (!updates) throw new AppError(400, "Bad Request", "No updates provided");

    const updatedProgress = await progress.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProgress)
      throw new AppError(404, "Not found", "Progress not found");

    sendResponse(
      res,
      200,
      true,
      { data: updatedProgress },
      null,
      "Update Progress Successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = progressController;
