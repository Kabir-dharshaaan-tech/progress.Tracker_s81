const mongoose = require("mongoose");

const MentorUpdateSchema = new mongoose.Schema({
  date: { type: String, required: true }, 
  purple: { type: [String], default: ["", "", "", "", ""] },
  blue: { type: [String], default: ["", "", "", "", ""] },
  brown: { type: [String], default: ["", "", "", "", ""] },
});

module.exports = mongoose.model("MentorUpdate", MentorUpdateSchema);
