import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';
import deerLogo from '../assets/deer-logo.svg';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // In a real app, you would extract the token from the URL query parameters
  // const token = new URLSearchParams(location.search).get('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    // Clear any errors
    setError('');
    
    // In a real app, you would send the token and new password to your API
    console.log('Password reset submitted:', formData);
    
    // Show success message
    setSubmitted(true);
    
    // Redirect to login after a delay
    setTimeout(() => {
      navigate('/login');
    }, 3000);
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
          <h1>Create New Password</h1>
          <p>Please enter and confirm your new password</p>
        </div>
        
        {!submitted ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your new password"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                required
              />
            </div>
            
            <button type="submit" className="auth-button">
              Set New Password
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
            <h2>Password Updated</h2>
            <p>Your password has been successfully updated.</p>
            <p>Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;