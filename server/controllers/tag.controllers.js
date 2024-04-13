const { sendResponse, AppError } = require("../helpers/utils.js");
const tag = require("../models/Tag.js");
const tagController = {};

// Create a tag
tagController.createTag = async (req, res, next) => {
  try {
    const info = req.body;
    if (!info) throw new AppError(402, "Bad Request", "Create tag Error");
    const created = await tag.create(info);
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
  try {
    const listOfFound = await tag.find({ isDeleted: false });
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

  try {
    const tagInfo = await tag.findOne({ _id: targetId, isDeleted: false });
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

// Soft delete a tag
tagController.deleteTag = async (req, res, next) => {
  const targetId = req.params.tagId;
  try {
    const tagToUpdate = await tag.findById(targetId);
    if (!tagToUpdate) throw new AppError("Tag not found", 404);

    // Perform a soft delete by setting isDeleted to true
    tagToUpdate.isDeleted = true;
    const updatedTag = await tagToUpdate.save();

    sendResponse(
      res,
      200,
      true,
      { tag: updatedTag },
      null,
      "Soft delete tag successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = tagController;
