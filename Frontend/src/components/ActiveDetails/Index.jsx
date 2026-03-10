import "./index.css";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Index.jsx";

const Index = () => {
  const [selected, setSelected] = useState("Week");
  const [chartData, setChartData] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const Api = import.meta.env.VITE_API_URL || "http://localhost:5000/user";

  const fetchActivity = async (range) => {
    try {
      const response = await fetch(
        `${Api}/activity/${range.toLowerCase()}`
      );
      const data = await response.json();
      const activityData = data.activity || [];
      setChartData(activityData);
      const total = activityData.reduce(
        (sum, item) => sum + item.calories,0);
      setTotalCalories(total);
    } catch (error) {
      console.log("Error fetching activity", error);
    }
  };
  useEffect(() => {
    fetchActivity(selected);
  }, [selected]);
  return (
    <>
      <Navbar />
      <div className="activity-page">
        <div className="time-selector">
          <button
            className={selected === "Day" ? "active" : ""}
            onClick={() => setSelected("Day")}
          >
            Day
          </button>
          <button
            className={selected === "Week" ? "active" : ""}
            onClick={() => setSelected("Week")}
          >
            Week
          </button>
          <button
            className={selected === "Month" ? "active" : ""}
            onClick={() => setSelected("Month")}
          >
            Month
          </button>
        </div>
        <div className="stats-card">
          <p className="label">Calories Burned</p>
          <div className="calories">
            <h1>{totalCalories}</h1>
            <span>kcal</span>
          </div>
          <p className="trend">Updated from server</p>
          <div className="chart">
            {Array.isArray(chartData) &&
              chartData.map((item, index) => (
                <div
                  key={index}
                  className="bar"
                  style={{
                    height: `${item.calories / 10}%`
                  }}
                >
                  <span>{item.label}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="activities">
          <div className="activities-header">
            <h3>Recent Activities</h3>
            <button>View All</button>
          </div>
          <div className="activity-item">
            <div className="icon green">🏃</div>
            <div className="activity-info">
              <h4>Morning Run</h4>
              <p>5.2 km • 340 kcal • High Intensity</p>
            </div>
            <span className="time">8:30 AM</span>
          </div>
          <div className="activity-item">
            <div className="icon blue">🏊</div>
            <div className="activity-info">
              <h4>Evening Swim</h4>
              <p>1.5 km • 420 kcal • Moderate</p>
            </div>
            <span className="time">Yesterday</span>
          </div>
          <div className="activity-item">
            <div className="icon orange">🏋</div>
            <div className="activity-info">
              <h4>Strength Training</h4>
              <p>45 min • 210 kcal • High Intensity</p>
            </div>
            <span className="time">Yesterday</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index; 