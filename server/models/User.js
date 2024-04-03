const mongoose = require("mongoose");
//Create schema
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
    goals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goal",
      },
    ],
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

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.isDeleted;
  return user;
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

//Create and export model
const User = mongoose.model("User", userSchema);
module.exports = User;
