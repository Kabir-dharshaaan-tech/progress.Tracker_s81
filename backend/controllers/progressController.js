


const Progress = require("../models/Progress");
const User = require("../models/User");


const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

const updateProgress = async (req, res) => {
  try {
    const { solved, belt } = req.body;
    const now = new Date();
    const todayDate = formatDate(now);

    console.log("🕒 Server Time:", now.toLocaleString());
    console.log("📌 Checking for progress on:", todayDate);

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "❌ User not found" });

    let progress = await Progress.findOne({ userId: req.user.id, date: todayDate });

    if (progress) {
 
      progress.solved = solved;
      progress.belt = belt;
      progress.percentage = `${((progress.solved / progress.total) * 100).toFixed(2)}%`;
      await progress.save();

      console.log("✅ Progress replaced successfully:", progress);
      return res.status(200).json({ message: "✅ Progress replaced successfully!", progress });
    } else {
      console.log("⚠️ No progress found. Creating new entry...");

      
      progress = new Progress({
        userId: req.user.id,
        name: user.name,
        date: todayDate,
        solved,
        total: 5,  
        belt,
        percentage: `${((solved / 5) * 100).toFixed(2)}%`,
      });

      await progress.save();
      console.log("✅ New progress entry created:", progress);
      return res.status(201).json({ message: "✅ New progress entry created!", progress });
    }
  } catch (error) {
    console.error("❌ Error updating progress:", error);
    res.status(500).json({ message: "❌ Server error while updating progress" });
  }
};

const getAllProgress = async (req, res) => {
  try {
    console.log("📊 Fetching all students' progress...");
    const progressData = await Progress.find();

    if (!progressData.length) {
      return res.status(404).json({ message: "⚠️ No progress data found" });
    }

    console.log("✅ All Progress Data Retrieved:", progressData);
    res.status(200).json(progressData);
  } catch (error) {
    console.error("❌ Error fetching progress data:", error);
    res.status(500).json({ message: "❌ Server error while fetching progress data" });
  }
};

const getMyProgress = async (req, res) => {
  try {
    console.log("👤 Fetching progress for user:", req.user.id);
    const progressData = await Progress.find({ userId: req.user.id });

    if (!progressData.length) {
      return res.status(404).json({ message: "⚠️ No progress found for this user" });
    }

    console.log("✅ User Progress Data Retrieved:", progressData);
    res.status(200).json(progressData);
  } catch (error) {
    console.error("❌ Error fetching user progress:", error);
    res.status(500).json({ message: "❌ Server error while fetching user progress" });
  }
};


module.exports = { updateProgress, getAllProgress, getMyProgress };
