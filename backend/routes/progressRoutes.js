



const express = require("express");
const { updateProgress, getAllProgress, getMyProgress } = require("../controllers/progressController"); // ✅ Ensure correct import
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Route for updating progress (Protected: Only logged-in users)
router.post("/update", authMiddleware, async (req, res, next) => {
  try {
    console.log("🔄 Incoming Progress Update Request from:", req.user.id);
    await updateProgress(req, res);
  } catch (error) {
    console.error("❌ Error in Progress Update Route:", error);
    next(error);
  }
});

// ✅ Route to get all students' progress (Public)
router.get("/all", async (req, res, next) => {
  try {
    console.log("📊 Fetching All Progress Data...");
    await getAllProgress(req, res);
  } catch (error) {
    console.error("❌ Error in Fetching Progress Data:", error);
    next(error);
  }
});

// ✅ Route to get logged-in user's progress (Protected)
router.get("/myprogress", authMiddleware, async (req, res, next) => {
  try {
    console.log("👤 Fetching Progress Data for:", req.user.id);
    await getMyProgress(req, res);
  } catch (error) {
    console.error("❌ Error in Fetching User Progress:", error);
    next(error);
  }
});

module.exports = router;
