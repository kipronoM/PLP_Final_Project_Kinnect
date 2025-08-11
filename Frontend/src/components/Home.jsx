import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import deerLogo from '../assets/deer-logo.svg';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="logo-container">
          <img src={deerLogo} alt="Deer Totem Logo" className="deer-logo" />
          <h1 className="app-title">KALYAKO HERITAGE</h1>
          <p className="app-tagline">Preserving our roots, connecting our branches</p>
        </div>
        
        <div className="auth-container">
          <div className="auth-card">
            <h2>Welcome to Your Family Heritage</h2>
            <p>Track your lineage and connect with your clan.</p>
            
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-login">
                Login
              </Link>
              <Link to="/signup" className="btn btn-signup">
                Join the Clan
              </Link>
            </div>
            
            <div className="auth-footer">
              <p>Deer Totem - Strength, Grace, Family</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;