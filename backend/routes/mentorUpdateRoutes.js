const express = require("express");
const { updateMentorQuestions, getLatestMentorQuestions } = require("../controllers/mentorUpdateController");

const router = express.Router();

router.post("/update", updateMentorQuestions); // ✅ Any student can update
router.get("/latest", getLatestMentorQuestions); // ✅ Any student can access

module.exports = router;
