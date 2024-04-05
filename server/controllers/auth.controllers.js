const user = require("../models/User.js");
const { sendResponse, AppError } = require("../helpers/utils.js");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

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
      { data: { user: logIn, accessToken } },
      null,
      "Log In Successfully"
    );
  } catch (err) {
    next(err);
  }
};

authController.loginWithGoogle = async (req, res, next) => {
  try {
    console.log("🚀 ~ authController.loginWithGoogle= ~ req.body:", req.body);

    // get data from req
    const { access_token } = req.body;

    // Get the user's information from the access token
    const ticket = await client.getTokenInfo(access_token);
    const { email } = ticket;

    // Find or create a user with the same email
    let userInfo = await user.findOne({ email });
    if (!userInfo) {
      userInfo = new user({ email });
      await userInfo.save();
    }

    const accessToken = await userInfo.generateToken();

    // Send response
    sendResponse(
      res,
      200,
      true,
      { userInfo, accessToken },
      null,
      "Log In Successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = authController;
