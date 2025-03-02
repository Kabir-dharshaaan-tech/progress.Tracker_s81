


const Progress = require("../models/Progress");
const User = require("../models/User");

// ✅ Update Progress - Only between 4 PM and 1 PM (Next Day)
exports.updateProgress = async (req, res) => {
  try {
    const { solved, belt } = req.body;
    const now = new Date(); // ✅ Ensure `now` is defined inside the function
    const currentHour = now.getHours();
    const date = now.toLocaleDateString();

    // ✅ Convert 24-hour format to 12-hour format with AM/PM
    const hours12Format = currentHour % 12 || 12;
    const amPm = currentHour >= 12 ? "PM" : "AM";
    const formattedTime = `${hours12Format}:${now.getMinutes().toString().padStart(2, "0")} ${amPm}`;

    // ✅ Debugging Logs - INSIDE FUNCTION
    console.log("🕒 Server Full Time:", now.toLocaleString()); // Full Date & Time
    console.log("⏰ Server Hour (24-hour format):", currentHour); // Current Hour (24-hour)
    console.log("📌 Checking if update is allowed...");

    // ❌ Restrict updates BEFORE 4 PM (16:00) and AFTER 1 PM (13:00)
    if (!(currentHour >= 16 || currentHour < 13)) {
      return res.status(403).json({ message: "❌ Progress can only be updated between 4 PM and 1 PM (next day)." });
    }

    // Check if user exists
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "❌ User not found" });

    // Save progress
    const progress = new Progress({
      userId: req.userId,
      name: user.name,
      date,
      solved,
      belt,
      percentage: `${((solved / 5) * 100).toFixed(2)}%`,
    });

    await progress.save();
    res.status(201).json({ message: "✅ Progress updated successfully", progress });
  } catch (error) {
    console.error("❌ Error updating progress:", error);
    res.status(500).json({ message: "❌ Server error while updating progress" });
  }
};

// ✅ Get All Students' Progress (Public)
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find().sort({ date: -1 });

    // ✅ Debugging Log (inside function)
    console.log("✅ Fetched Progress Data:", progress);

    res.json(progress);
  } catch (error) {
    console.error("❌ Error fetching progress:", error);
    res.status(500).json({ message: "❌ Error fetching progress" });
  }
};

// ✅ Get My Progress (Only for logged-in users)
exports.getMyProgress = async (req, res) => {
  try {
    const myProgress = await Progress.find({ userId: req.userId }).sort({ date: -1 });

    // ✅ Debugging Log (inside function)
    console.log("✅ User Progress Data:", myProgress);

    res.json(myProgress);
  } catch (error) {
    console.error("❌ Error fetching user progress:", error);
    res.status(500).json({ message: "❌ Error fetching user progress" });
  }
};
