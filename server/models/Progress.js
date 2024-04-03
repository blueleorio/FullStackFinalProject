const mongoose = require("mongoose");
//Create schema

const progressSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "onTrack",
        "missed",
        "notStarted",
        "late",
        "abandoned",
        "completed",
      ],
      default: "notStarted",
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
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
