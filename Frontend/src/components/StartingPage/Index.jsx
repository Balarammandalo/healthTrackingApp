import "./index.css"
import MobileImage from "../../images/MobileImage.png"

const Index = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <p className="hero-tag">#1 nutrition tracking app</p>
          <h1 className="hero-title">
            Nutrition tracking <br />
            for <span className="highlight">real life</span>
          </h1>
          <p className="hero-desc">
            Make progress with the all-in-one food, exercise,
            and calorie tracker.
          </p>
        </div>
        <div className="hero-right">
          <img src={MobileImage} alt="mobile app" />
        </div>

      </div>
    </section>
  )
}

export default Index