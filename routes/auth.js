
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, loginType } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Role check
    if (loginType === "Admin" && user.role !== "Admin") {
      return res.status(403).json({ message: "This is not an Admin account" });
    }
    if (loginType === "Member" && user.role !== "Member") {
      return res.status(403).json({ message: "This is not a Member account" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, tenant: user.tenant },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error hai bhai" });
  }
});

export default router;
