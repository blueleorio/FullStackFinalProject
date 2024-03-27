const mongoose = require("mongoose");
//Create schema
const habitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    frequency: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Welcome to real world,Trust the process, Top of the summit, Pit hole",
      ],
      default: "Welcome to real world",
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
const Habit = mongoose.model("Habit", habitSchema);
module.export = Habit;
