
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Member"], required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true }
});

export default mongoose.model("User", userSchema);

