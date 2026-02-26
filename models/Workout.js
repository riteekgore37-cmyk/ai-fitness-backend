const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    fitness_goal: { type: String, required: true },
    fitness_level: { type: String, required: true },
    place: [{ type: String }],
    min_per_day: { type: Number, required: true },
    type: { type: String, required: true },
    total_number_days: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);