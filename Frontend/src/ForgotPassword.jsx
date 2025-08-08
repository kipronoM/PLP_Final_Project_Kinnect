import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import deerLogo from './assets/deer-logo.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
    setSubmitted(true);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-sidebar">
        <div className="auth-sidebar-content">
          <img src={deerLogo} alt="Deer Totem" className="sidebar-logo" />
          <h2>KALYAKO HERITAGE</h2>
          <p>Reconnect with your ancestral roots</p>
          <div className="sidebar-decoration"></div>
        </div>
      </div>
      
      <div className="auth-form-container">
        <div className="auth-form-header">
          <h1>Reset Password</h1>
          <p>Enter your email to receive password reset instructions</p>
        </div>
        
        {!submitted ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <button type="submit" className="auth-button">
              Reset Password
            </button>
            
            <div className="auth-redirect">
              <p>
                Remember your password? <Link to="/login">Back to Login</Link>
              </p>
            </div>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Email Sent</h2>
            <p>Check your inbox for instructions to reset your password.</p>
            <Link to="/login" className="auth-button">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

