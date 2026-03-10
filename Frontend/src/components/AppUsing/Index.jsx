import "./index.css"

import phone1 from "../../images/Mobile1.png"
import phone2 from "../../images/Mobile2.png"
import phone3 from "../../images/Mobile3.png"

const Index = () => {
  return (
    <section className="goals">
      <h2 className="goals-title">
        Hit your health goals in <span>1-2-3</span>
      </h2>
      <div className="goal-row">
        <div className="goal-image">
          <img src={phone1} alt="track calories"/>
        </div>
        <div className="goal-text">
          <h3 className="goal-number">1</h3>
          <h4>Track calories, macros & more</h4>
          <p>
            Log even faster with tools like barcode scan & the NEW voice log!
          </p>
        </div>
      </div>
      <div className="goal-row">
        <div className="goal-text">
          <h3 className="goal-number">2</h3>
          <h4>Follow your progress</h4>
          <p>
            Forget perfection. This is about building long-term habits and enjoying the journey.
          </p>
        </div>
        <div className="goal-image">
          <img src={phone2} alt="progress tracking"/>
        </div>
      </div>
      <div className="goal-row">
        <div className="goal-image purple-bg">
          <img src={phone3} alt="meal planning"/>
        </div>
        <div className="goal-text">
          <h3 className="goal-number">3</h3>
          <h4>Eat better and hit your goals</h4>
          <p>
            Learn which foods help you feel your best and get tailored weekly meal plans.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Index;