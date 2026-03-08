import { useState } from "react";
import { useContext } from "react";
import { SignupContext } from "../../../Context/SignupProvider.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const Index = () => {
    const { updateSignupData } = useContext(SignupContext);
  const location = useLocation();
  const navigate = useNavigate();

  const step1Data = location.state;

  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    activityLevel: "Sedentary",
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActivity = (level) => {
    setFormData((prev) => ({
      ...prev,
      activityLevel: level,
    }));
  };

  const handleSubmit = () => {
    const combinedData = {
      ...step1Data,
      ...formData,
    };

    updateSignupData(combinedData);
    navigate("/signup3", { state: combinedData });
  };

  return (
    <div className="step2-container">
      <div className="step2-header">
        <h2>Step 2 - Body Details</h2>
      </div>
      <div className="input-section">
        <div className="row">
          <div className="input-group">
            <label>Weight</label>
            <div className="input-wrapper">
              <input
                type="number"
                name="weight"
                placeholder="75"
                value={formData.weight}
                onChange={handleChange}
              />
              <span>kg</span>
            </div>
          </div>
          <div className="input-group">
            <label>Height</label>
            <div className="input-wrapper">
              <input
                type="number"
                name="height"
                placeholder="180"
                value={formData.height}
                onChange={handleChange}
              />
              <span>cm</span>
            </div>
          </div>
        </div>
        <div className="activity-section">
          <label>Activity Level</label>

          {[
            {
              key: "Lightly Active",
              title: "Lightly Active",
              desc: "Exercise 1-3 days/week",
            },
            {
              key: "Moderately Active",
              title: "Moderately Active",
              desc: "Exercise 3-5 days/week",
            },
            {
              key: "Very Active",
              title: "Very Active",
              desc: "Exercise 6-7 days/week",
            },
          ].map((item) => (

            <div
              key={item.key}
              className={`activity-card ${formData.activityLevel === item.key ? "active" : ""
                }`}
              onClick={() => handleActivity(item.key)}
            >

              <div className="icon-box">🏃</div>

              <div className="activity-text">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>

              <div className="radio-circle">
                {formData.activityLevel === item.key && (
                  <div className="radio-dot"></div>
                )}
              </div>

            </div>

          ))}

        </div>
      </div>
      <div className="footer-section">
        <button className="continue-btn" onClick={handleSubmit}>
          Continue
        </button>

        <button className="skip-btn">
          Skip for now
        </button>
      </div>

    </div>
  );
};

export default Index;