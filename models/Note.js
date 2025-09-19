import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Note", noteSchema);
