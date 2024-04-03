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

module.exports = progressController;
