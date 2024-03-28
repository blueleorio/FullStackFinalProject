const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { sendResponse, AppError } = require("../helpers/utils.js");
const authentication = {};

authentication.loginRequired = (req, res, next) => {
  const tokenString = req.headers.authorization;

  if (!tokenString) {
    return sendResponse(res, 401, "Access denied. No token provided.");
  }
  try {
    const token = tokenString.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Token expired.");
        } else {
          throw new AppError(401, "Invalid token.");
        }
      }
      req.userId = payload._id;
    });

    next();
  } catch (error) {
    next(error);
    // return sendResponse(res, 400, "Invalid token.");
  }
};

module.exports = authentication;
