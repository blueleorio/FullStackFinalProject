const mongoose = require("mongoose");
//Create schema
const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
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
const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
