import React from 'react';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="berry-icon">
          <div className="berry"></div>
          <div className="leaf"></div>
        </div>
        
        <h1 className="welcome-title">
          <span className="fresh">Fresh</span>
          <span className="berry">Berry</span>
        </h1>
        
        <div className="coming-soon">
          <h2>Coming Soon</h2>
          <p>We're working hard to bring you something amazing!</p>
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        
        <div className="features">
          <div className="feature">
            <div className="feature-icon">🌱</div>
            <span>Fresh & Natural</span>
          </div>
          <div className="feature">
            <div className="feature-icon">💜</div>
            <span>Premium Quality</span>
          </div>
          <div className="feature">
            <div className="feature-icon">🍓</div>
            <span>Delicious Taste</span>
          </div>
        </div>
      </div>
      
      <div className="background-animation">
        <div className="floating-berry berry-1"></div>
        <div className="floating-berry berry-2"></div>
        <div className="floating-berry berry-3"></div>
        <div className="floating-berry berry-4"></div>
      </div>
    </div>
  );
};

export default Welcome;
