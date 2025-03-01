


// const express = require("express");
// const { updateProgress, getAllProgress, getMyProgress } = require("../controllers/progressController");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// // ✅ Protected route: Only logged-in users can update their progress
// router.post("/update", authMiddleware, updateProgress);

// // ✅ Public route: Get all students' progress (for dashboard)
// router.get("/all", getAllProgress);

// // ✅ Protected route: Get progress for the logged-in student
// router.get("/myprogress", authMiddleware, getMyProgress);

// module.exports = router;
const express = require("express");
const { updateProgress, getAllProgress, getMyProgress } = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Protected route: Only logged-in users can update their progress
router.post("/update", authMiddleware, updateProgress);

// ✅ Public route: Get all students' progress (for dashboard)
router.get("/all", getAllProgress);

// ✅ Protected route: Get progress for the logged-in student
router.get("/myprogress", authMiddleware, getMyProgress);

module.exports = router;
