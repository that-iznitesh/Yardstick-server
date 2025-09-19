
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Invite new Member
router.post("/invite", authMiddleware, requireRole("Admin"), async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email & password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashed,
      role: "Member", // default role
      tenant: req.user.tenant._id
    });

    res.json({ message: "Member invited successfully", user: { email: newUser.email, role: newUser.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Upgrade tenant plan
router.post("/tenants/:slug/upgrade", authMiddleware, requireRole("Admin"), async (req, res) => {
  const tenant = await Tenant.findOneAndUpdate(
    { slug: req.params.slug },
    { plan: "Pro" },
    { new: true }
  );
  if (!tenant) return res.status(404).json({ error: "Tenant not found" });
  res.json(tenant);
});

export default router;
