

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const progressRoutes = require("./routes/progressRoutes");
const authRoutes = require("./routes/authRoutes");
const mentorUpdateRoutes = require("./routes/mentorUpdateRoutes"); // ✅ Import Mentor Update Routes

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/mentor", mentorUpdateRoutes); // ✅ Register Mentor Update Routes

// ✅ Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "❌ API route not found" });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


