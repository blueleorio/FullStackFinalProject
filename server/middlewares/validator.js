const { body, param } = require("express-validator");

const createUserValidationRules = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  // Add more rules as needed
];
const createTaskValidationRules = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("status")
    .exists()
    .withMessage("Status is required")
    .isIn(["pending", "working", "review", "done", "archive"])
    .withMessage("Invalid status"),
  body("assignedTo")
    .exists()
    .withMessage("AssignedTo is required")
    .isArray()
    .withMessage("AssignedTo must be an array"),
];

const idValidationRules = [
  param("id")
    .exists()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("ID must be a valid Mongo ObjectId"),
];

module.exports = {
  createUserValidationRules,
  createTaskValidationRules,
  idValidationRules,
};
