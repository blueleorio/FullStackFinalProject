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
      default: "",
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Expert"],
      default: "Easy",
    },
    frequency: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        default: [],
      },
    ],
    counter: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "Welcome to real world",
        "Trust the process",
        "Top of the summit",
        "Pit hole",
      ],
      default: "Welcome to real world",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
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
const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
