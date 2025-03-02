
const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);  // ✅ Ensure this is defined properly

module.exports = router;
