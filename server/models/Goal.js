const mongoose = require("mongoose");
//Create schema
const goalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    targetDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["on-track,missed,not-started,late,abandoned,completed"],
      default: "on-track",
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
    },
  },
  {
    timestamps: true,
  }
);
//Create and export model
const Goal = mongoose.model("Goal", goalSchema);
module.export = Goal;
