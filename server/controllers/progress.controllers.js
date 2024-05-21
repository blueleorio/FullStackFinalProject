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
    const progresses = await progress.find().limit(30);

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

module.exports = progressController;
