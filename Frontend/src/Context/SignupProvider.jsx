import { createContext, useState } from "react";

export const SignupContext = createContext();

export const SignupProvider = ({ children }) => {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "Sedentary",
    goalType: "",
    targetWeight: "",
    targetDuration: ""
  });

  const updateSignupData = (data) => {
    setSignupData((prev) => ({
      ...prev,
      ...data
    }));
  };

  return (
    <SignupContext.Provider value={{ signupData, updateSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};