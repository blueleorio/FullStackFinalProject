const mongoose = require("mongoose");

//Create schema
const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 20,
      lowercase: true,
    },

    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

//Create and export model
const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
