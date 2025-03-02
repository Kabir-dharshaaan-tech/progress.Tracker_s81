


const express = require("express");
const { updateProgress, getAllProgress, getMyProgress } = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/update", authMiddleware, updateProgress); // Protected: Only logged-in users can update progress
router.get("/all", getAllProgress); // Public: Get all students' progress (for dashboard)
router.get("/myprogress", authMiddleware, getMyProgress); // Protected: Get logged-in user's progress

module.exports = router;
