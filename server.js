import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9900;

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Feedback Schema (no extra import!)
const feedbackSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sender: { type: String, default: "Anonymous" },
  timestamp: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Feedback route
app.post("/api/feedback", async (req, res) => {
  try {
    const { message, sender } = req.body;
    const feedback = new Feedback({ message, sender });
    await feedback.save();
    res.status(200).json({ success: true, message: "Feedback saved!" });
  } catch (error) {
    console.error("❌ Error saving feedback:", error);
    res.status(500).json({ success: false, message: "Error saving feedback" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


