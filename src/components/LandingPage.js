import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Create a CSS file for custom styles
import lettuce from '../assets/logo.png';

const LandingPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const generateUsername = () => {
    // Concatenate the first and last name and add a random number between 10 and 99
    const randomNum = Math.floor(Math.random() * 90) + 10;
    setUsername(firstName.replace(/\s/g, '').toLowerCase() + lastName.replace(/\s/g, '').toLowerCase() + randomNum);
  };

  return (
    <div className="landing-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center p-5">
            <img
              src={lettuce} // Replace with your lettuce icon image
              alt="Lettuce Icon"
              className="lettuce-icon"
            />
            <h1>lettuce</h1>
            <h3>Let us save food, one lettuce at a time.</h3>
            <div className="mb-3">
              <input
                type="text"
                placeholder='First Name'
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">

              <input
                placeholder='Last Name'
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>

              <input
                placeholder='Username'
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <button
                onClick={generateUsername}
                className="btn btn-link"
                disabled={firstName === '' || lastName === ''}
              >
                Suggest username
              </button>
            </div >

            <Link
              to={{
                pathname: '/scan-receipt',
              }}
              state={{ username: username }}
              className={`btn btn-lg btn-success mt-3 ${username === '' ? 'disabled' : ''}`}
            >
              Let us
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LandingPage;
