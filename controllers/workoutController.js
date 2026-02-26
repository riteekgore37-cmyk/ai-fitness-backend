const Workout = require("../models/Workout");
const User = require("../models/User");

// ================= GET ALL WORKOUTS =================
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();

    const formatted = workouts.map((w) => ({
      id: w._id,
      name: w.name,
      description: w.description,
      fitness_goal: w.fitness_goal,
      fitness_level: w.fitness_level,
      place: w.place,
      min_per_day: w.min_per_day,
      type: w.type,
      total_number_days: w.total_number_days
    }));

    res.status(200).json({
      success: true,
      data: formatted,
      meta: {}
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= ENROLL WORKOUT =================
exports.enrollWorkout = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Workout ID required"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user.enrolledWorkouts.includes(id)) {
      user.enrolledWorkouts.push(id);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Enrolled successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET MY WORKOUTS =================
exports.getMyWorkouts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("enrolledWorkouts");

    res.status(200).json({
      success: true,
      data: user.enrolledWorkouts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};