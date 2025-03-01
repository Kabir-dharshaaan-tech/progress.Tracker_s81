

// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ Enable CORS to allow frontend communication
// app.use(cors());

// // ✅ Middleware to parse JSON requests
// app.use(express.json());

// // ✅ Load API Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/progress", require("./routes/progressRoutes"));

// // ✅ Catch-all for undefined routes
// app.use((req, res) => {
//   res.status(404).json({ message: "❌ API route not found" });
// });

// // ✅ Start Server on Correct Port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log("\x1b[32m%s\x1b[0m", `✅ Server running at: http://localhost:${PORT}`);
// });
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware"); // Import auth middleware if required

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS to allow frontend communication
app.use(cors());

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Load API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));

// ✅ Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "❌ API route not found" });
});

// ✅ Start Server on Correct Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("\x1b[32m%s\x1b[0m", `✅ Server running at: http://localhost:${PORT}`);
});
