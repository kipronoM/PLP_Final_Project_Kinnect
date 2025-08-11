import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import deerLogo from '../assets/deer-logo.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    // In a real app, you would validate credentials against your backend
    // For demo purposes, we'll just redirect to the dashboard
    console.log('Login submitted:', formData);
    
    // Clear any errors
    setError('');
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-page-container">
      <div className="auth-sidebar">
        <div className="auth-sidebar-content">
          <img src={deerLogo} alt="Deer Totem" className="sidebar-logo" />
          <h2>KALYAKO HERITAGE</h2>
          <p>Connecting generations through shared ancestry</p>
          <div className="sidebar-decoration"></div>
        </div>
      </div>
      
      <div className="auth-form-container">
        <div className="auth-form-header">
          <h1>Welcome Back</h1>
          <p>Continue your family heritage journey</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
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
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          
          <button type="submit" className="auth-button">
            Log In
          </button>
          
          <div className="auth-redirect">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;