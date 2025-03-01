// const mongoose = require("mongoose");

// const ProgressSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   name: { type: String, required: true }, 
//   date: { type: String, required: true },
//   solved: { type: Number, required: true, min: 0, max: 5 },
//   percentage: { type: Number, required: true }
// });

// module.exports = mongoose.model("Progress", ProgressSchema);



// const mongoose = require("mongoose");

// const ProgressSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   name: { type: String, required: true },
//   date: { type: String, required: true },
//   solved: { type: Number, required: true, min: 0, max: 5 },
//   belt: { type: String, required: true }, // New field for belt level
// });

// module.exports = mongoose.model("Progress", ProgressSchema);

// models/Progress.js
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
