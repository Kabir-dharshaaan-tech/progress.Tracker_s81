

const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  solved: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 5, // Default total problems to 5
  },
  percentage: {
    type: String,
    required: true,
  },
  belt: {
    type: String, // Belt level (Green, Blue, etc.)
    required: true,
  },
});

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
