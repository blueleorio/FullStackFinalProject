const { sendResponse, AppError } = require("../helpers/utils.js");

const user = require("../models/User.js");

const userController = {};
//Create a user
carController.createUser = async (req, res, next) => {
  //in real project you will getting info from req

  try {
    const info = req.body;

    //always remember to control your inputs
    if (!info) throw new AppError(402, "Bad Request", "Create user Error");
    //mongoose query
    const created = await user.create(info);
    sendResponse(
      res,
      200,
      true,
      { user: created },
      null,
      "Create user Successfully"
    );
  } catch (err) {
    next(err);
  }
};

//Get all user
carController.getUsers = async (req, res, next) => {
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

//Update a user
carController.editUser = async (req, res, next) => {
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
carController.deleteUser = async (req, res, next) => {
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
