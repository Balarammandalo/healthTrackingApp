import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SignupContext } from "../../../Context/SignupProvider.jsx";
import "./index.css";

const Index = () => {
  const { updateSignupData } = useContext(SignupContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.age ||
      !formData.gender
    ) {
      setError("Please fill all fields");
      return;
    }

    updateSignupData(formData);
    navigate("/signup2");
  };

  return (
    <div className="onboarding-container">

      <div className="title-section">
        <h1>Create Account</h1>
        <p>Let's start with some basic details</p>
      </div>

      <form className="onboarding-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="row">

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="25"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="continue-btn">
          Continue
        </button>

        <p className="step-text">
          Step 1 of 3
        </p>

      </form>

    </div>
  );
};

export default Index;