import React, { useState, useEffect } from "react";
import "./index.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { FitnessCenter } from "@mui/icons-material";
import Navbar from "../Navbar/Index.jsx";

const Index = () => {
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [weeklyData, setWeeklyData] = useState({
    weeks: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    calories: []
  });
  const pieData = [
    { id: 0, value: 30, label: "ABS" },
    { id: 1, value: 20, label: "Back" },
    { id: 2, value: 35, label: "Legs" },
    { id: 3, value: 15, label: "Shoulder" }
  ];
  const fetchActivity = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/user/activity/week"
      );
      const data = await response.json();
      setBmi(data.bmi);
      setCategory(data.category);
      const caloriesArray = data.activity.map(item => item.calories);
      setWeeklyData({
        weeks: data.activity.map(item => item.label),
        calories: caloriesArray
      });
    } catch (error) {
      console.log("Error fetching BMI data", error);
    }
  };
  useEffect(() => {
    fetchActivity();
  }, []);
  const totalCalories = weeklyData.calories.reduce(
    (sum, c) => sum + c,0);
  const workouts = weeklyData.calories.length;
  const avgCalories = workouts
    ? Math.floor(totalCalories / workouts)
    : 0;
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h2>BMI: {bmi} ({category})</h2>
        <div className="stats-grid">
          <div className="card">
            <h3>Calories Burned</h3>
            <p className="value">{totalCalories} kcal</p>
            <span>Total calories burned this week</span>
          </div>
          <div className="card">
            <h3>Workouts</h3>
            <p className="value">{workouts}</p>
            <span>Total number of workouts</span>
          </div>
          <div className="card">
            <h3>Average Calories Burned</h3>
            <p className="value">{avgCalories} kcal</p>
            <span>Average calories per workout</span>
          </div>
        </div>
        <div className="charts">
          <div className="chart-card">
            <h3>Weekly Calories Burned</h3>
            <BarChart
              xAxis={[{ scaleType: "band", data: weeklyData.weeks }]}
              series={[{ data: weeklyData.calories }]}
              height={300}
            />
          </div>
          <div className="chart-card">
            <h3>Workout Categories</h3>
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 40,
                  outerRadius: 120,
                  paddingAngle: 5
                }
              ]}
              height={300}
            />
          </div>
          <div className="chart-card">
            <h3>Add New Workout</h3>
            <textarea
              className="workout-input"
              placeholder="#Legs
- Back Squat
- 5 sets x 15 reps
- 30kg
- 10 min"
            />
            <button className="add-btn">
              <FitnessCenter /> Add Workout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;