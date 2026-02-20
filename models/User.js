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

  age: {
    type: Number
  },

  weight: {
    type: Number
  },

  height: {
    type: Number
  },

  goal: {
    type: String,
    enum: ["muscle_gain", "fat_loss", "maintenance"]
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);