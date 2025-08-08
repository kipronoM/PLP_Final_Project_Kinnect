import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import deerLogo from './assets/deer-logo.svg';

const Dashboard = () => {
  // Mock user data - in a real app, this would come from your authentication system
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'March 1, 2025',
    familyRank: 'Parent',
    familyMembers: 12,
    recentActivity: [
      { id: 1, type: 'Added family member', name: 'Elizabeth Doe', relation: 'Aunt', date: 'Feb 28, 2025' },
      { id: 2, type: 'Updated information', name: 'Robert Doe', relation: 'Grandfather', date: 'Feb 25, 2025' },
      { id: 3, type: 'Added document', name: 'Birth Certificate', subject: 'Mary Doe', date: 'Feb 20, 2025' }
    ],
    timelineEvents: [
      { id: 1, year: '1945', event: 'Grandparents\' Wedding', description: 'James and Eleanor Doe were married in Chicago' },
      { id: 2, year: '1968', event: 'Family Migration', description: 'The Doe family moved from Chicago to Portland' },
      { id: 3, year: '1992', event: 'Family Business', description: 'Opening of Doe\'s Hardware Store' }
    ]
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img src={deerLogo} alt="Deer Totem" className="header-logo" />
          <h1>KALYAKO HERITAGE</h1>
        </div>
        
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className="menu-icon"></span>
        </button>
        
        <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul>
            <li><Link to="/dashboard" className="active">Dashboard</Link></li>
            <li><Link to="/FamilyTree">Family Tree</Link></li>
            <li><Link to="/Documents">Documents</Link></li>
            <li><Link to="/Stories">Stories</Link></li>
            <li><Link to="/Profile">Profile</Link></li>
            {user.familyRank === 'Elder' && <li><Link to="/admin">Admin</Link></li>}
          </ul>
        </nav>
        
        <div className="header-actions">
          <div className="user-profile">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <span className="user-rank">{user.familyRank}</span>
            <div className="user-menu-dropdown">
              <Link to="/profile">My Profile</Link>
              <Link to="/settings">Settings & Preferences</Link>
              <Link to="/help">Help Center</Link>
              <Link to="/">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome back, {user.name.split(' ')[0]}</h2>
          <p>Continue tracing your family's heritage journey</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card family-tree-preview">
            <h3>Your Family Tree</h3>
            <div className="tree-preview-container">
              <div className="tree-preview-placeholder">
                <div className="tree-node tree-root">You</div>
                <div className="tree-connections">
                  <div className="tree-node tree-ancestor">Parent</div>
                  <div className="tree-node tree-ancestor">Parent</div>
                  <div className="tree-node tree-sibling">Sibling</div>
                  <div className="tree-node tree-child">Child</div>
                </div>
              </div>
              <Link to="/family-tree" className="tree-explore-button">Explore Full Tree</Link>
            </div>
          </div>

          <div className="dashboard-card stats-card">
            <h3>Your Heritage Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{user.familyMembers}</span>
                <span className="stat-label">Family Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Generations</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Documents</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2</span>
                <span className="stat-label">Family Stories</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card activity-card">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              {user.recentActivity.map(activity => (
                <li key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type.includes('Added family') ? '👤' : 
                     activity.type.includes('Updated') ? '✏️' : 
                     activity.type.includes('Added document') ? '📄' : 
                     activity.type.includes('Added story') ? '📖' : '🔔'}
                  </div>
                  <div className="activity-details">
                    <span className="activity-type">{activity.type}</span>
                    <span className="activity-subject">
                      {activity.name} {activity.relation && `(${activity.relation})`}
                    </span>
                    <span className="activity-date">{activity.date}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/activity" className="view-all-link">View All Activity</Link>
          </div>

          <div className="dashboard-card timeline-card">
            <h3>Family Timeline</h3>
            <div className="timeline-container">
              {user.timelineEvents.map(event => (
                <div key={event.id} className="timeline-item">
                  <div className="timeline-year">{event.year}</div>
                  <div className="timeline-content">
                    <h4>{event.event}</h4>
                    <p>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/timeline" className="view-all-link">View Complete Timeline</Link>
          </div>

          <div className="dashboard-card family-spotlight">
            <h3>Family Spotlight</h3>
            <div className="spotlight-content">
              <div className="spotlight-image">
                <div className="placeholder-image">👨‍👩‍👧‍👦</div>
              </div>
              <div className="spotlight-info">
                <h4>Doe Family Reunion</h4>
                <p>Annual gathering celebrating our shared heritage</p>
                <p><strong>Date:</strong> July, 15 2025</p>
                <button className="spotlight-button">View Details</button>
              </div>
            </div>
          </div>

          <div className="dashboard-card quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-button">
                <span className="action-icon">👤</span>
                Add Family Member
              </button>
              <button className="action-button">
                <span className="action-icon">📄</span>
                Upload Document
              </button>
              <button className="action-button">
                <span className="action-icon">📖</span>
                Record a Story
              </button>
              <button className="action-button">
                <span className="action-icon">📅</span>
                Add Timeline Event
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-branding">
            <img src={deerLogo} alt="Deer Totem" className="footer-logo" />
            <p>KALYAKO HERITAGE</p>
            <p className="footer-tagline">Preserving your family's legacy, one story at a time</p>
          </div>
          <div className="footer-links-container">
            <div className="footer-links-column">
              <h4>Navigation</h4>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/FamilyTree">Family Tree</Link>
              <Link to="/documents">Documents</Link>
              <Link to="/stories">Stories</Link>
            </div>
            <div className="footer-links-column">
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/faq">FAQ</Link>
            </div>
            <div className="footer-links-column">
              <h4>Legal</h4>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/data">Data Protection</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Kalyako Heritage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;