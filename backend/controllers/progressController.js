
// const Progress = require("../models/Progress");
// const User = require("../models/User");

// // ✅ Route to update progress (Only logged-in users)
// exports.updateProgress = async (req, res) => {
//   try {
//     const { solved } = req.body;
//     const date = new Date().toLocaleDateString();

//     // Find student details
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Calculate percentage
//     const completionRate = ((solved / 5) * 100).toFixed(2);

//     // Save progress
//     const progress = new Progress({
//       userId: req.userId,
//       name: user.name,
//       date,
//       solved,
//       percentage: completionRate,
//     });

//     await progress.save();
//     res.status(201).json({ message: "Progress updated successfully", progress });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating progress" });
//   }
// };

// // ✅ Route to get progress for the logged-in student
// exports.getMyProgress = async (req, res) => {
//   try {
//     const progress = await Progress.find({ userId: req.userId }).sort({ date: -1 });
//     res.json(progress);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching progress" });
//   }
// };

// // ✅ Route to get all students' progress (for dashboard)
// exports.getAllProgress = async (req, res) => {
//   try {
//     const progress = await Progress.find().sort({ date: -1 });
//     res.json(progress);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching progress" });
//   }
// };

// controllers/progressController.js
const Progress = require("../models/Progress");
const User = require("../models/User");

// ✅ Route to update progress (Only logged-in users)
exports.updateProgress = async (req, res) => {
  try {
    const { solved, belt } = req.body; // We accept both 'solved' and 'belt' from the user
    const date = new Date().toLocaleDateString();

    // Find student details
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Save the progress (track number of problems solved and belt level)
    const progress = new Progress({
      userId: req.userId,
      name: user.name,
      date,
      solved,
      belt, // Belt level will be provided directly from the front end
    });

    await progress.save();
    res.status(201).json({ message: "Progress updated successfully", progress });
  } catch (error) {
    res.status(500).json({ message: "Error updating progress" });
  }
};

// ✅ Route to get all students' progress (for dashboard)
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find().sort({ date: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress" });
  }
};

