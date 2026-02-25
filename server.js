const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

/* =============================
   MIDDLEWARE
============================= */
app.use(express.json());
app.use(cors());

/* =============================
   DATABASE CONNECTION
============================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

/* =============================
   ROOT ROUTE
============================= */
app.get("/", (req, res) => {
  res.send("🚀 AI Fitness Coach Backend Running");
});

/* =============================
   API ROUTES
============================= */

// Auth Routes (register, login)
app.use("/api/v1/user", authRoutes);

// User Protected Routes (workouts, nutrition, meals)
app.use("/api/v1/user", userRoutes);

/* =============================
   SERVER
============================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
