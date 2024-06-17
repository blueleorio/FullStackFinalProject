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

    // Set cookie
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 3600000 });

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
  const userId = req.params.id;
  const filter = { isDeleted: false };

  if (userId) {
    filter._id = userId;
  }
  try {
    //mongoose query
    const listOfFound = await user.find(filter).limit(2);
    sendResponse(
      res,
      200,
      true,
      { user: listOfFound, page: 1, total: 100 },
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

  const currentUser = await user.findById(currentUserId);
  if (!currentUser)
    throw new AppError(400, "User not found", "Get Current User Error");

  return sendResponse(
    res,
    200,
    true,
    { data: currentUser },
    null,
    "Get Current User successful"
  );
};

// Update User Info
userController.editUser = async (req, res, next) => {
  const targetId = req.userId;
  const updateInfo = req.body;

  const allows = [
    "email",
    "name",
    "aboutMe",
    "address",
    "city",
    "country",
    "phoneNumber",
    "avatarUrl",
  ];
  const updates = Object.keys(updateInfo)
    .filter((key) => allows.includes(key))
    .reduce((obj, key) => {
      obj[key] = updateInfo[key];
      return obj;
    }, {});

  const options = { new: true };
  try {
    let updated = await user.findByIdAndUpdate(targetId, updates, options);
    if (!updated)
      throw new AppError(400, "User not found", "Update User Error");

    return sendResponse(
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
  // empty target mean delete nothing
  const targetId = req.userId;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const deleted = await Task.findByIdAndUpdate(
      targetId,
      { isDeleted: true },
      options
    );
    if (!deleted) throw new AppError("Task not found", 404);

    sendResponse(
      res,
      200,
      true,
      { user: deleted },
      null,
      "Delete User Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

//export
module.exports = userController;
