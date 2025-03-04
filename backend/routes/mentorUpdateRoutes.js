const express = require("express");
const { updateMentorQuestions, getLatestMentorQuestions } = require("../controllers/mentorUpdateController");

const router = express.Router();

router.post("/update", updateMentorQuestions); 
router.get("/latest", getLatestMentorQuestions); 

module.exports = router;
