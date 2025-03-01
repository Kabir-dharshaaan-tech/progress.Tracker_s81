

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔍 Checking login for:", email);

    // ✅ Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ User found:", user.email);
    console.log("🔑 Entered Password:", password);
    console.log("🔐 Stored Hashed Password:", user.password);

    // ✅ Compare hashed password with entered password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isMatch); // Debug log

    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ Password matches for:", email);

    // ✅ Generate JWT Token
    if (!process.env.JWT_SECRET) {
      console.error("❌ ERROR: JWT_SECRET is not set in .env file!");
      return res.status(500).json({ message: "Server error: Missing JWT_SECRET" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login successful for:", email);
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
