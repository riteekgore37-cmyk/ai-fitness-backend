const Workout = require("../models/Workout");

const seedWorkouts = async () => {
  const count = await Workout.countDocuments();

  if (count === 0) {
    console.log("🌱 Seeding workouts...");

    await Workout.insertMany([
      {
        name: "Full Body Workout",
        description: "Complete full body program",
        fitness_goal: "muscle_gain",
        fitness_level: "beginner",
        place: ["Home", "Gym"],
        min_per_day: 45,
        type: "Strength",
        total_number_days: 30
      },
      {
        name: "Push Pull Legs",
        description: "Hypertrophy split routine",
        fitness_goal: "muscle_gain",
        fitness_level: "intermediate",
        place: ["Gym"],
        min_per_day: 60,
        type: "Bodybuilding",
        total_number_days: 42
      }
    ]);

    console.log("✅ Workouts seeded");
  }
};

module.exports = seedWorkouts;