


const Progress = require("../models/Progress");
const User = require("../models/User");

// ✅ Update Progress - Only for logged-in users
exports.updateProgress = async (req, res) => {
  try {
    const { solved, belt } = req.body;
    const date = new Date().toLocaleDateString();

    // Check if user exists
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Save progress
    const progress = new Progress({
      userId: req.userId,
      name: user.name,
      date,
      solved,
      belt,
      percentage: `${((solved / 5) * 100).toFixed(2)}%`, // Convert solved to percentage
    });

    await progress.save();
    res.status(201).json({ message: "✅ Progress updated successfully", progress });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "❌ Error updating progress" });
  }
};

// ✅ Get All Students' Progress (Public)
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find().sort({ date: -1 });
    console.log("✅ Fetched Progress Data:", progress);
    res.json(progress);
  } catch (error) {
    console.error("❌ Error fetching progress:", error);
    res.status(500).json({ message: "Error fetching progress" });
  }
};

// ✅ Get My Progress (Only for logged-in users)
exports.getMyProgress = async (req, res) => {
  try {
    const myProgress = await Progress.find({ userId: req.userId }).sort({ date: -1 });
    res.json(myProgress);
  } catch (error) {
    console.error("❌ Error fetching user progress:", error);
    res.status(500).json({ message: "Error fetching user progress" });
  }
};


