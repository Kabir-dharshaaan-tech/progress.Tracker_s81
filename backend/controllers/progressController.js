


// const Progress = require("../models/Progress");
// const User = require("../models/User");

// // ✅ Update Progress - Only between 4 PM and 1 PM (Next Day)
// exports.updateProgress = async (req, res) => {
//   try {
//     const { solved, belt } = req.body;
//     const now = new Date(); // ✅ Ensure `now` is defined inside the function
//     const currentHour = now.getHours();
//     const date = now.toLocaleDateString();

//     // ✅ Convert 24-hour format to 12-hour format with AM/PM
//     const hours12Format = currentHour % 12 || 12;
//     const amPm = currentHour >= 12 ? "PM" : "AM";
//     const formattedTime = `${hours12Format}:${now.getMinutes().toString().padStart(2, "0")} ${amPm}`;

//     // ✅ Debugging Logs - INSIDE FUNCTION
//     console.log("🕒 Server Full Time:", now.toLocaleString()); // Full Date & Time
//     console.log("⏰ Server Hour (24-hour format):", currentHour); // Current Hour (24-hour)
//     console.log("📌 Checking if update is allowed...");

//     // ❌ Restrict updates BEFORE 4 PM (16:00) and AFTER 1 PM (13:00)
//     if (!(currentHour >= 16 || currentHour < 13)) {
//       return res.status(403).json({ message: "❌ Progress can only be updated between 4 PM and 1 PM (next day)." });
//     }

//     // Check if user exists
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ message: "❌ User not found" });

//     // Save progress
//     const progress = new Progress({
//       userId: req.userId,
//       name: user.name,
//       date,
//       solved,
//       belt,
//       percentage: `${((solved / 5) * 100).toFixed(2)}%`,
//     });

//     await progress.save();
//     res.status(201).json({ message: "✅ Progress updated successfully", progress });
//   } catch (error) {
//     console.error("❌ Error updating progress:", error);
//     res.status(500).json({ message: "❌ Server error while updating progress" });
//   }
// };

// // ✅ Get All Students' Progress (Public)
// exports.getAllProgress = async (req, res) => {
//   try {
//     const progress = await Progress.find().sort({ date: -1 });

//     // ✅ Debugging Log (inside function)
//     console.log("✅ Fetched Progress Data:", progress);

//     res.json(progress);
//   } catch (error) {
//     console.error("❌ Error fetching progress:", error);
//     res.status(500).json({ message: "❌ Error fetching progress" });
//   }
// };

// // ✅ Get My Progress (Only for logged-in users)
// exports.getMyProgress = async (req, res) => {
//   try {
//     const myProgress = await Progress.find({ userId: req.userId }).sort({ date: -1 });

//     // ✅ Debugging Log (inside function)
//     console.log("✅ User Progress Data:", myProgress);

//     res.json(myProgress);
//   } catch (error) {
//     console.error("❌ Error fetching user progress:", error);
//     res.status(500).json({ message: "❌ Error fetching user progress" });
//   }
// };


const Progress = require("../models/Progress");
const User = require("../models/User");

// ✅ Function to Format Date as "DD/MM/YYYY"
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
  const day = String(d.getDate()).padStart(2, "0"); // Ensure two-digit day
  return `${day}/${month}/${year}`; // ✅ Ensures DD/MM/YYYY format (Matches MongoDB)
};

// ✅ Update Progress - Modify Existing Entry if Within Same Day, Otherwise Create New Entry
exports.updateProgress = async (req, res) => {
  try {
    const { solved, belt } = req.body;
    const now = new Date();
    const currentHour = now.getHours();
    const todayDate = formatDate(now); // ✅ Convert to "DD/MM/YYYY"

    console.log("🕒 Server Full Time:", now.toLocaleString());
    console.log("⏰ Server Hour (24-hour format):", currentHour);
    console.log(`📌 Checking for existing progress with Date: ${todayDate}`);

    // ❌ Restrict updates BEFORE 4 PM (16:00) and AFTER 1 PM (13:00)
    if (!(currentHour >= 16 || currentHour < 13)) {
      return res.status(403).json({ message: "❌ Progress can only be updated between 4 PM and 1 PM (next day)." });
    }

    // ✅ Check if user exists
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "❌ User not found" });

    // ✅ Fix: Ensure date comparison matches stored format (DD/MM/YYYY)
    console.log(`🔍 Searching for existing progress: userId=${req.user.id}, date=${todayDate}`);

    let progress = await Progress.findOne({ userId: req.user.id, date: todayDate });

    console.log("🔍 Query Result:", progress);

    if (progress) {
      // ✅ Update existing progress entry
      progress.solved += solved; // ✅ Accumulate instead of overwriting
      progress.belt = belt;
      progress.percentage = `${((progress.solved / progress.total) * 100).toFixed(2)}%`;
      await progress.save();

      console.log("✅ Progress updated successfully:", progress);
      return res.status(200).json({ message: "✅ Progress updated successfully!", progress });
    } else {
      console.log("⚠️ No existing progress found. Creating a new entry...");

      // 🔥 Create a new entry only when the date changes
      progress = new Progress({
        userId: req.user.id,
        name: user.name,
        date: todayDate, // ✅ Store date in "DD/MM/YYYY" format (Matches MongoDB)
        solved,
        total: 5, // ✅ Ensure total is set to 5
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
