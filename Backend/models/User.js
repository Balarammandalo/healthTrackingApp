const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    weight: {
      type: Number,
    },

    height: {
      type: Number,
    },

    activityLevel: {
      type: String,
      enum: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"],
    },

     goalType: {
      type: String,
      enum: ["Weight Loss", "Weight Gain", "Maintain Weight"],
      required: true,
    },

    targetWeight: {
      type: Number,
      required: true,
    },

    targetDuration: {
      type: Number,
      required: true,
    },

    isPremium: {
      type: Boolean,
      default: false,
    },
  },
);
module.exports = mongoose.model("User", userSchema);