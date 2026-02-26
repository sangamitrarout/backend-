// Force DNS servers to avoid ECONNREFUSED on Windows
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9900;

app.use(express.json());

// ✅ Correct MongoDB connection (no deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Feedback route
app.post("/feedback", (req, res) => {
  console.log("Feedback received:", req.body); // log incoming data
  res.status(200).json({ message: "Message sent successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




