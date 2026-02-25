const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

/* =============================
   WORKOUT ROUTES
============================= */

router.get("/myWorkouts", protect, (req, res) => {
  res.json({
    success: true,
    data: [
      {
        _id: "1",
        name: "Chest Builder",
        duration: 45,
        level: "Intermediate"
      },
      {
        _id: "2",
        name: "Leg Destroyer",
        duration: 60,
        level: "Advanced"
      }
    ]
  });
});

router.get("/workouts", protect, (req, res) => {
  res.json({
    success: true,
    data: [
      { _id: "1", name: "Full Body Workout" },
      { _id: "2", name: "Push Pull Legs" }
    ]
  });
});

router.get("/templates", protect, (req, res) => {
  res.json({
    success: true,
    data: [
      { _id: "1", name: "Muscle Gain Template" },
      { _id: "2", name: "Fat Loss Template" }
    ]
  });
});

/* =============================
   NUTRITION ROUTES
============================= */

router.get("/nutri-guide/today-meals", protect, (req, res) => {
  res.json({
    success: true,
    data: [
      { meal: "Breakfast", calories: 400 },
      { meal: "Lunch", calories: 600 },
      { meal: "Dinner", calories: 500 }
    ]
  });
});

router.get("/nutri-guide/daily-goals", protect, (req, res) => {
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

router.get("/nutri-guide/todays-intake", protect, (req, res) => {
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

/* =============================
   MEAL PLAN ROUTES
============================= */

router.get("/myMealPlan", protect, (req, res) => {
  res.json({
    success: true,
    data: {
      name: "Lean Muscle Plan",
      duration: "4 Weeks"
    }
  });
});

router.get("/mealPlans", protect, (req, res) => {
  res.json({
    success: true,
    data: [
      { _id: "1", name: "Weight Loss Plan" },
      { _id: "2", name: "Muscle Gain Plan" }
    ]
  });
});

module.exports = router;
