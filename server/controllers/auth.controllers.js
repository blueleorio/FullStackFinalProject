const user = require("../models/User.js");
const { sendResponse, AppError } = require("../helpers/utils.js");
const bcrypt = require("bcryptjs");
const authController = {};

//Create a user
authController.loginWithEmail = async (req, res, next) => {
  try {
    // get data from req
    const info = req.body;

    // Business logic validation

    const logIn = await user.findOne({ email: info.email }, "+password");

    if (!logIn) {
      throw new AppError(402, "Invalid Credentials", "Login Error");
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(info.password, logIn.password);
    if (!isMatch) {
      throw new AppError(402, "Wrong password", "Login Error");
    }

    const accessToken = await logIn.generateToken();

    // Send response
    sendResponse(
      res,
      200,
      true,
      { user: logIn, accessToken },
      null,
      "Log In Successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = authController;
