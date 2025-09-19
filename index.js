import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import noteRoutes from "./routes/notes.js";
import tenantRoutes from "./routes/tenants.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));




// Mongo connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

  app.get("/health", (req, res) => {
  res.json({ status: "ok" });
}); 
// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/notes", noteRoutes);
app.use("/tenants", tenantRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;

