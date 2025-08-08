import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
import FamilyTree from './FamilyTree';  // Import the FamilyTree page
import Documents from './Documents';  // Import the Documents page
import Stories from './Stories';  // Import the Stories page
import Profile from './Profile';  // Import the Profile page
import Admin from './Settings';  // Import the Admin page (optional)
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/FamilyTree" element={<FamilyTree />} />
        <Route path="/Documents" element={<Documents />} />
        <Route path="/Stories" element={<Stories />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Settings" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;