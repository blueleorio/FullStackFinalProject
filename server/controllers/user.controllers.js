const { sendResponse, AppError } = require("../helpers/utils.js");
const bcrypt = require("bcryptjs");
const user = require("../models/User.js");

const userController = {};
//Create a user
userController.createUser = async (req, res, next) => {
  try {
    let info = req.body;

    if (!info) throw new AppError(402, "Bad Request", "Create user Error");

    // Validate info - for example: check if email, username is unique
    const emailExist = await user.findOne({ email: info.email });
    if (emailExist) {
      throw new AppError(400, "Email already exists", "Create user Error");
    }

    //mongoose query to create a user

    // The magic starts here
    const salt = await bcrypt.genSalt(10);
    info.password = await bcrypt.hash(info.password, salt);

    // Actually create the user in $created
    const created = await user.create(info);
    const accessToken = await created.generateToken();

    // Send response
    sendResponse(
      res,
      200,
      true,
      { user: created, accessToken },
      null,
      "Create user Successfully"
    );
  } catch (err) {
    next(err);
  }
};

//Get all user
userController.getUsers = async (req, res, next) => {
  //in real project you will getting condition from from req then construct the filter object for query
  // empty filter mean get all
  const filter = {};
  try {
    //mongoose query
    const listOfFound = await user.find(filter).limit(2);
    sendResponse(
      res,
      200,
      true,
      { user: listOfFound, page: 1, total: 1192 },
      null,
      "Get User List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Get current user - Why no use /getUsers/:id???

userController.getCurrentUser = async (req, res, next) => {
  const currentUserId = req.userId;

  const user = await user.findById(currentUserId);
  if (!user)
    throw new AppError(400, "User not found", "Get Current User Error");

  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get Current User successful"
  );
};

//Update a user
userController.editUser = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  //you will also get updateInfo from req
  // empty target and info mean update nothing
  const targetId = null;
  const updateInfo = "";

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await user.findByIdAndUpdate(targetId, updateInfo, options);

    sendResponse(
      res,
      200,
      true,
      { user: updated },
      null,
      "Update User Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

//Delete user
userController.deleteUser = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const targetId = null;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await user.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { user: updated },
      null,
      "Delete User Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

//export
module.exports = userController;
