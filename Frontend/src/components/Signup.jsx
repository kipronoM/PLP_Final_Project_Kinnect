import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import deerLogo from '../assets/deer-logo.svg';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Handle signup logic here
    console.log('Signup submitted:', formData);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-sidebar">
        <div className="auth-sidebar-content">
          <img src={deerLogo} alt="Deer Totem" className="sidebar-logo" />
          <h2>KALYAKO HERITAGE</h2>
          <p>Begin your ancestral journey</p>
          <div className="sidebar-decoration"></div>
        </div>
      </div>
      
      <div className="auth-form-container">
        <div className="auth-form-header">
          <h1>Join The Clan</h1>
          <p>Create an account to track your family heritage</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <div className="form-checkbox">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeTerms">
              I agree to the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>
          
          <button type="submit" className="auth-button">
            Create Account
          </button>
          
          <div className="auth-redirect">
            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;