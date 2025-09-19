
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  await User.deleteMany({});
  await Tenant.deleteMany({});

  const acme = await Tenant.create({ name: "Acme Corp", slug: "acme", plan: "Free" });
  const globex = await Tenant.create({ name: "Globex Inc", slug: "globex", plan: "Free" });

  const hashed = await bcrypt.hash("password", 10);

  await User.create([
    { email: "admin@acme.test", password: hashed, role: "Admin", tenant: acme._id },
    { email: "user@acme.test", password: hashed, role: "Member", tenant: acme._id },
    { email: "admin@globex.test", password: hashed, role: "Admin", tenant: globex._id },
    { email: "user@globex.test", password: hashed, role: "Member", tenant: globex._id }
  ]);

  console.log("Seed data inserted");
  process.exit(0);
};

seed();
