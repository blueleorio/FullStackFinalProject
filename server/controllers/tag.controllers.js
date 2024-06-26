const { sendResponse, AppError } = require("../helpers/utils.js");
const tag = require("../models/Tag.js");
const Habit = require("../models/Habit.js");
const Goal = require("../models/Goal.js");

const tagController = {};

// Create a tag
tagController.createTag = async (req, res, next) => {
  const currentUserId = req.userId;

  try {
    const info = req.body;
    if (!info) throw new AppError(402, "Bad Request", "Create tag Error");
    const tagData = { ...info, createdBy: currentUserId };
    const created = await tag.create(tagData);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create tag Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get all tags
tagController.getTags = async (req, res, next) => {
  const currentUserId = req.userId;
  try {
    const listOfFound = await tag.find({ createdBy: currentUserId });
    if (!listOfFound) throw new AppError("No tag found", 404);
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound },
      null,
      "Get Tag List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Get current tag info
tagController.getCurrentTagInfo = async (req, res, next) => {
  const targetId = req.params.tagId;
  console.log("🚀 ~ file: tag.controllers.js:52 ~ tagController.getCurrentTagInfo= ~ targetId:", targetId)

  try {
    const tagInfo = await tag.findOne({ _id: targetId });
    if (!tagInfo) throw new AppError("Tag not found", 404);
    sendResponse(
      res,
      200,
      true,
      { tagInfo },
      null,
      "Get tag info Successfully"
    );
  } catch (error) {
    next(error);
  }
};

// Update a tag
tagController.editTag = async (req, res, next) => {
  const targetId = req.params.tagId;
  const updateInfo = req.body;
  const options = { new: true };
  try {
    const updated = await tag.findByIdAndUpdate(targetId, updateInfo, options);
    sendResponse(
      res,
      200,
      true,
      { tag: updated },
      null,
      "Update tag Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Hard delete a tag
tagController.deleteTag = async (req, res, next) => {
  const targetId = req.params.tagId;
  try {
    const deletionResult = await tag.findByIdAndDelete(targetId);
    if (!deletionResult) throw new AppError("Tag not found", 404);

    sendResponse(res, 200, true, null, null, "Tag deleted successfully");
  } catch (err) {
    next(err);
  }
};

// Get all habits/ goals with a specific tag
tagController.getHabitGoalByTag = async (req, res, next) => {
  const targetId = req.params.tagId;
  const currentUserId = req.userId;
  try {
    const tagInfo = await tag.findOne({ _id: targetId });
    if (!tagInfo) throw new AppError("Tag not found", 404);
    const habits = await Habit.find({ tags: targetId, createdBy: currentUserId, isDeleted: false });
    const goals = await Goal.find({ tags: targetId, createdBy: currentUserId, isDeleted: false });
    sendResponse(
      res,
      200,
      true,
      { data: { habits, goals } },
      null,
      "Get habit and goal by tag successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = tagController;
