const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getAllWorkouts,
  enrollWorkout,
  getMyWorkouts
} = require("../controllers/workoutController");

/* ================= WORKOUTS ================= */

router.get("/workouts", authMiddleware, getAllWorkouts);
router.post("/myWorkouts", authMiddleware, enrollWorkout);
router.get("/myWorkouts", authMiddleware, getMyWorkouts);

/* ================= NUTRITION (Keep Dummy For Now) ================= */

router.get("/nutri-guide/today-meals", (req, res) => {
  res.json({
    success: true,
    data: [
      { meal: "Breakfast", calories: 400 },
      { meal: "Lunch", calories: 600 }
    ]
  });
});

module.exports = router;
