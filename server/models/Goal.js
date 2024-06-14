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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    counter: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      default: "weekly",
    },
    repeat: {
      type: Number,
      default: 1,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      // required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    progress: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Progress" }],
      default: [],
    },
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    tags: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
      default: [],
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
const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
