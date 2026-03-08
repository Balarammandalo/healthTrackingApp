import React, { useState, useEffect } from "react";
import "./index.css";

const reviews = [
  {
    title: "3.5 Million 5-Star Ratings",
    quote:
      "Good for tracking calories and macros with a huge database of food.",
    author: "Iain M.",
  },
  {
    title: "Track Your Health Goals",
    quote:
      "This app helped me stay consistent with my diet and daily health tracking.",
    author: "Sarah K.",
  },
  {
    title: "Stay Fit & Healthy",
    quote:
      "The dashboard and health insights are amazing for monitoring progress.",
    author: "Daniel R.",
  },
  {
    title: "Best Health Tracking App",
    quote:
      "Easy to use and perfect for tracking workouts, meals and calories.",
    author: "Emily W.",
  },
  {
    title: "Build Healthy Habits",
    quote:
      "It motivates me every day to maintain a healthier lifestyle.",
    author: "James L.",
  },
];

const Index = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home">
      <div className="home-content">

        <div className="stars">★★★★★</div>

        <h1 className="home-title">{reviews[current].title}</h1>

        <p className="home-quote">“{reviews[current].quote}”</p>

        <p className="home-author">{reviews[current].author}</p>

        <div className="dots">
          {reviews.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
            ></span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Index;