const mongoose = require("mongoose");
//Create schema

const progressSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false, // imcomplete
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deletedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
//Create and export model
const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
