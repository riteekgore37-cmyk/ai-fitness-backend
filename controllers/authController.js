const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ===== HELPER FUNCTIONS =====

// Calculate Age from DOB
const calculateAge = (dob) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Calculate BMI
const calculateBMI = (weight, height) => {
  if (!weight || !height) return null;
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

// Calculate Daily Calories
const calculateCalories = (weight, fitness_level, goal) => {
  if (!weight) return null;

  let baseCalories = weight * 30;

  if (fitness_level === "intermediate") baseCalories += 200;
  if (fitness_level === "advanced") baseCalories += 400;

  if (goal === "weight_loss") baseCalories -= 300;
  if (goal === "muscle_gain") baseCalories += 300;

  return baseCalories;
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      dob,
      height,
      weight,
      gender,
      fitness_level,
      fitness_goal,
      injuries,
      preferences
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dob,
      height,
      weight,
      gender,
      fitness_level,
      fitness_goal,
      injuries,
      preferences,
      onboardingCompleted: true
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      token,
      user: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    const age = calculateAge(user.dob);
    const bmi = calculateBMI(user.weight, user.height);
    const daily_calories = calculateCalories(
      user.weight,
      user.fitness_level,
      user.fitness_goal
    );

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        age,
        bmi,
        daily_calories
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...req.body,
        onboardingCompleted: true
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
