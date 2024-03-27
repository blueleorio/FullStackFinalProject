const mongoose = require("mongoose");
//Create schema
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    habits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Create and export model
const User = mongoose.model("User", userSchema);
module.exports = User;