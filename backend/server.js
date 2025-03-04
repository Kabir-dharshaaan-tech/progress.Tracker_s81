

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const progressRoutes = require("./routes/progressRoutes");
const authRoutes = require("./routes/authRoutes");
const mentorUpdateRoutes = require("./routes/mentorUpdateRoutes"); 

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});


app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/mentor", mentorUpdateRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "❌ API route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


