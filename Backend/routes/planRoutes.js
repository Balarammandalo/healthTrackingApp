const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const User = require("../models/User");
const calculateBMI = require("../utils/calculateBMI");
const jwt = require("jsonwebtoken");



const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};


router.get("/startPlan", protect ,async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const bmi = calculateBMI(user.weight, user.height);

    const bodyFat = (
      1.2 * bmi +
      0.23 * user.age -
      (user.gender === "male" ? 16.2 : 5.4)
      ).toFixed(1);
      

    const goalWeight = user.goalWeight || 68;
    const initialWeight = user.initialWeight || user.weight;

    const totalLoss = initialWeight - goalWeight;
    const currentLoss = initialWeight - user.weight;

    const goalProgress =
      totalLoss > 0
        ? ((currentLoss / totalLoss) * 100).toFixed(0)
        : 0;

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const activities = await Activity.find({
      user: user._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const totalCalories = activities.reduce(
      (sum, act) => sum + act.calories,
      0
    );

    const totalDuration = activities.reduce(
      (sum, act) => sum + act.duration,
      0
      );
      
    res.json({
      user: {
        fullName: user.fullName,
        weight: user.weight,
        height: user.height,
        goalWeight,
      },
      metrics: {
        bmi,
        bodyFat,
        goalProgress: `${goalProgress}%`,
      },
      dailyActivity: {
        totalCalories,
        totalDuration,
        activities,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;