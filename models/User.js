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

  dob: String,

  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },

  height: Number, // in cm
  weight: Number, // in kg

  fitness_level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"]
  },

  fitness_goal: {
    type: String,
    enum: ["weight_loss", "muscle_gain", "maintenance"]
  },

  injuries: [String],

  preferences: {
    target_weight: Number,
    workout_place: String,
    preferred_equipment: [String]
  },

  onboardingCompleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
