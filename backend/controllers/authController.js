const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // ✅ Ensure .env variables are loaded

// ✅ Signup Route
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("🔍 Checking if user already exists:", email);

    // ✅ Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("✅ Creating new user:", email);

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Store hashed password in MongoDB
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log("✅ Signup successful for:", email);
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
};

// ✅ Login Route
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔍 Checking login for:", email);

    // ✅ Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("✅ User found:", user.email);

    // ✅ Compare hashed password with entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password matches for:", email);

    // ✅ Generate JWT Token for authentication
    if (!process.env.JWT_SECRET) {
      console.error("❌ ERROR: JWT_SECRET is not set in .env file!");
      return res.status(500).json({ message: "Server error: Missing JWT_SECRET" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("✅ Login successful for:", email);
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
