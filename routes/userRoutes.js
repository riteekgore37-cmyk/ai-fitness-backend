const express = require("express");
const router = express.Router();

/* ================= WORKOUTS ================= */

router.get("/workouts", (req, res) => {
  res.json({
    success: true,
    data: [
      { _id: "1", name: "Full Body Workout" },
      { _id: "2", name: "Push Pull Legs" }
    ]
  });
});

router.get("/myWorkouts", (req, res) => {
  res.json({
    success: true,
    data: [
      { _id: "1", name: "Chest Builder", duration: 45 }
    ]
  });
});

/* ================= NUTRITION ================= */

router.get("/nutri-guide/today-meals", (req, res) => {
  res.json({
    success: true,
    data: [
      { meal: "Breakfast", calories: 400 },
      { meal: "Lunch", calories: 600 }
    ]
  });
});

router.get("/nutri-guide/daily-goals", (req, res) => {
  res.json({
    success: true,
    data: {
      calories: 2500,
      protein: 150,
      carbs: 300,
      fats: 70
    }
  });
});

router.get("/nutri-guide/todays-intake", (req, res) => {
  res.json({
    success: true,
    data: {
      calories: 1800,
      protein: 120,
      carbs: 220,
      fats: 50
    }
  });
});

/* ================= MEAL PLANS ================= */

router.get("/myMealPlan", (req, res) => {
  res.json({
    success: true,
    data: {
      name: "Lean Muscle Plan",
      duration: "4 Weeks"
    }
  });
});

router.get("/mealPlans", (req, res) => {
  res.json({
    success: true,
    data: [
      { _id: "1", name: "Weight Loss Plan" }
    ]
  });
});

module.exports = router;
