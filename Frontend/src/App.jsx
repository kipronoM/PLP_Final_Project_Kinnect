import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import FamilyTree from './components/FamilyTree';  // Import the FamilyTree page
import Documents from './components/Documents';  // Import the Documents page
import Stories from './components/Stories';  // Import the Stories page
import Profile from './components/Profile';  // Import the Profile page
import Admin from './components/Settings';  // Import the Admin page (optional)
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