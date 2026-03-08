const calculateBMI = (weight, height) => {
  if (!weight || !height) {
    return {
      bmi: null,
      category: "Invalid data",
    };
  }

  const heightInMeters = height / 100;
  const bmiValue = weight / (heightInMeters * heightInMeters);
    
  const bmi = Number(bmiValue.toFixed(2));

  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  return {
    bmi,
    category,
  };
};

module.exports = calculateBMI;