import "./index.css";

const Index = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h1 className="logo">myfitnesspal®</h1>
          <p className="tagline">Nutrition tracking for real life.</p>
        </div>

        <div className="footer-right">
          
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>Premium</li>
              <li>Blog</li>
              <li>Community</li>
              <li>Contact Us</li>
              <li>Support Center</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Advertise With Us</li>
            </ul>
          </div>

        </div>
      </div>


      <div className="footer-bottom">
        <p>
          ©2026 MyFitnessPal, Inc. &nbsp; Community Guidelines &nbsp; Feedback &nbsp;
          Terms &nbsp; Privacy &nbsp; API &nbsp; Cookie Preferences
        </p>

        <div className="social-icons">
          <span>📷</span>
          <span>📘</span>
          <span>▶</span>
          <span>in</span>
          <span>✖</span>
          <span>🎵</span>
        </div>
      </div>
    </footer>
  );
};

export default Index;