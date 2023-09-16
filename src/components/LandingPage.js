import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Create a CSS file for custom styles

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <img
              src="lettuce-icon.png" // Replace with your lettuce icon image
              alt="Lettuce Icon"
              className="lettuce-icon"
            />
            <h1>Welcome to Lettuce</h1>
            <Link to="/scan-receipt" className="btn btn-primary btn-lg">
              Let us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
