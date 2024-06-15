const { sendResponse, AppError } = require("./helpers/utils.js");

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const cron = require('node-cron');

const indexRouter = require("./routes/index");
// Google's OAuth2 client
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const mongoose = require("mongoose");
/* DB connection*/
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log(`DB connected ${mongoURI}`))
  .catch((err) => console.log(err));

// This one is the index route. "/" vs "/api" => Remember this is the root route
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new AppError(404, "Not Found", "Bad Request");
  next(err);
});

/* Initialize Error Handling */
app.use((err, req, res, next) => {
  console.log("ERROR", err);
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    { message: err.message },
    err.isOperational ? err.errorType : "Internal Server Error"
  );
});

module.exports = app;
