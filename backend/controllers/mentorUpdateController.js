const MentorUpdate = require("../models/MentorUpdate");

// ✅ Helper Function to Format Date as "DD/MM/YYYY"
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

// ✅ Update Mentor's LeetCode Links
exports.updateMentorQuestions = async (req, res) => {
  try {
    const { purple, blue, brown } = req.body;
    const todayDate = formatDate(new Date());

    console.log("📝 Updating Mentor Questions for:", todayDate);

    let mentorUpdate = await MentorUpdate.findOne({ date: todayDate });

    if (mentorUpdate) {
      // ✅ Replace old questions with new ones
      mentorUpdate.purple = purple;
      mentorUpdate.blue = blue;
      mentorUpdate.brown = brown;
      await mentorUpdate.save();
      console.log("✅ Mentor Questions Updated:", mentorUpdate);
      return res.status(200).json({ message: "✅ Updated successfully!", mentorUpdate });
    } else {
      // ✅ Create a new entry for today
      mentorUpdate = new MentorUpdate({ date: todayDate, purple, blue, brown });
      await mentorUpdate.save();
      console.log("✅ New Mentor Questions Created:", mentorUpdate);
      return res.status(201).json({ message: "✅ New questions created!", mentorUpdate });
    }
  } catch (error) {
    console.error("❌ Error updating mentor questions:", error);
    res.status(500).json({ message: "❌ Server error while updating mentor questions" });
  }
};

// ✅ Get Latest Mentor Questions (Accessible by all students)
exports.getLatestMentorQuestions = async (req, res) => {
  try {
    console.log("📥 Fetching Latest Mentor Questions...");
    const latestQuestions = await MentorUpdate.findOne().sort({ date: -1 });

    if (!latestQuestions) {
      return res.status(404).json({ message: "⚠️ No mentor questions found." });
    }

    console.log("✅ Latest Mentor Questions Retrieved:", latestQuestions);
    res.status(200).json(latestQuestions);
  } catch (error) {
    console.error("❌ Error fetching mentor questions:", error);
    res.status(500).json({ message: "❌ Server error while fetching mentor questions" });
  }
};
