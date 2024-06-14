const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const { sendResponse, AppError } = require("../helpers/utils.js");
const authentication = {};

authentication.loginRequired = (req, res, next) => {
  try {
    // Headers => { authentication: Bearer token }
    const tokenString = req.headers.authorization;

    if (!tokenString) {
      return sendResponse(res, 401, "Access denied. No token provided.");
    }
    const token = tokenString.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Token expired.");
        } else {
          throw new AppError(401, "Invalid token.");
        }
      }

      // ! You can extract userId from the authentication req because this route is fired before anything
      req.userId = payload._id;
    });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
