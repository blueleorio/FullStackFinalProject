const { sendResponse, AppError } = require("../helpers/utils.js");
const { validationResult } = require("express-validator");

const validator = {};

validator.validate = (validationArray) => async (req, res, next) => {
  try {
    await Promise.all(validationArray.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    throw new AppError(422, "Validation Error", errors.array());
  } catch (err) {
    next(err);
  }
};
module.exports = validator;
