const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const progressRoutes = require("./routes/progressRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ Import authentication routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse incoming JSON requests

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
app.use("/api/auth", authRoutes); // ✅ Add Authentication Routes
app.use("/api/progress", progressRoutes); // Progress Routes

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
