import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SignupContext } from "../../../Context/SignupProvider.jsx";

import "./index.css";

const Index = () => {
  const { signupData, updateSignupData } = useContext(SignupContext);
  const navigate = useNavigate();
  const [goalType, setGoalType] = useState("Weight Loss");
  const [targetWeight, setTargetWeight] = useState("");
  const [duration, setDuration] = useState(3);
 
  const handleSubmit = async () => {
  if (!targetWeight) {
    alert("Enter target weight");
    return;
  }

  const goalData = {
    goalType,
    targetWeight,
    targetDuration: duration,
  };
  updateSignupData(goalData);
  const finalData = {
    ...signupData,
    ...goalData,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Signup Successful 🎉");
      navigate("/");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
};
  return (
    <div className="signup3-container">
      <h2>Step 3 - Goal</h2>
      <button onClick={() => setGoalType("Weight Loss")}>
        Weight Loss
      </button>
      <button onClick={() => setGoalType("Weight Gain")}>
        Weight Gain
      </button>
      <button onClick={() => setGoalType("Maintain Weight")}>
        Maintain Weight
      </button>
      <br />
      <input
        type="number"
        placeholder="Target Weight"
        value={targetWeight}
        onChange={(e) => setTargetWeight(e.target.value)}
      />
      <br />
      <select
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      >
        <option value={3}>3 Months</option>
        <option value={6}>6 Months</option>
        <option value={9}>9 Months</option>
        <option value={12}>12 Months</option>
      </select>

      <br />

      <button onClick={handleSubmit}>
        Complete Signup
      </button>

    </div>
  );
};

export default Index;