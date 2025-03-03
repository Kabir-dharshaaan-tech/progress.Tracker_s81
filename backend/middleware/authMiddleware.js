


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    console.log("❌ No valid token received"); // Debugging log
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    
    req.user = { id: decoded.userId }; // ✅ Change this from `req.userId` to `req.user.id`
    
    console.log("✅ Token Verified, User ID:", req.user.id); // Debugging log
    next();
  } catch (error) {
    console.log("❌ Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
