const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // ===== PROFILE FIELDS =====

  dob: {
    type: String
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },

  height: Number,
  weight: Number,

  fitness_level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"]
  },

  injuries: [String],

  preferences: {
    fitness_goal: String,
    target_weight: Number,
    workout_place: String,
    preferred_equipment: [String]
  },

  // ===== IMPORTANT FIELD =====
  onboardingCompleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
