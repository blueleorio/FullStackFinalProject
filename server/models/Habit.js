const mongoose = require("mongoose");

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
    startDate: {
      type: Date,
      required: true,
    },
    reminder: {
      type: String,
      enum: ["Daily", "Monthly", "Yearly", "None"],
      default: "None",
    },
    nextDates: [
      {
        type: Date,
        default: [],
      },
    ],
    imageUrl: {
      type: String,
      default: "",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        default: [],
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habit", habitSchema);
