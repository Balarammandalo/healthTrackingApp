const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bmiData = require("../utils/calculateBMI");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token provided"
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};


router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        Age: user.age,
        Height: user.height,
        Weight: user.weight,
      }
    });

  } catch (error) {

    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
});
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      age,
      gender,
      weight,
      height,
      activityLevel,
      goalType, targetWeight, targetDuration
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email and password are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      age,
      gender,
      weight,
      height,
      activityLevel,
      goalType, targetWeight, targetDuration
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      age: user.age,
      gender: user.gender,
      weight: user.weight,
      height: user.height,
      activityLevel: user.activityLevel,
      isPremium: user.isPremium,
      token,
      goalType : user.goalType, targetWeight: user.targetWeight, targetDuration: user.targetDuration
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/activity/:range", async (req, res) => {
  const { range } = req.params;
  console.log(range)
  const selectedRange = range.toLowerCase();
  try {

    const weight = 70;
    const height = 175;

    const bmiResult = bmiData(weight, height);

    const data = {

      day: [
        { label: "Today", calories: 350 }
      ],

      week: [
        { label: "Mon", calories: 300 },
        { label: "Tue", calories: 250 },
        { label: "Wed", calories: 420 },
        { label: "Thu", calories: 280 },
        { label: "Fri", calories: 520 },
        { label: "Sat", calories: 460 },
        { label: "Sun", calories: 240 }
      ],

      month: [
        { label: "Week1", calories: 2000 },
        { label: "Week2", calories: 2300 },
        { label: "Week3", calories: 2100 },
        { label: "Week4", calories: 2500 }
      ]

    };

    res.json({
      bmi: bmiResult.bmi,
      category: bmiResult.category,
      activity: data[selectedRange]
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});
module.exports = router;