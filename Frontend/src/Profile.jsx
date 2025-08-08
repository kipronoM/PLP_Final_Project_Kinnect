import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import deerLogo from './assets/deer-logo.svg';

const Profile = () => {
  // Enhanced user data with family information
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'March 1, 2025',
    familyRank: 'Parent',
    clan: 'Eagle Clan',
    biography: 'Family historian and genealogy enthusiast. Dedicated to preserving our family heritage for future generations.',
    phone: '+1 (555) 123-4567',
    location: 'Portland, Oregon',
    maritalStatus: 'Married',
    spouse: {
      name: 'Jane Doe',
      clan: 'Wolf Clan',
      familyRank: 'Parent'
    },
    children: [
      { name: 'Emily Doe', age: 14, clan: 'Eagle Clan' },
      { name: 'Michael Doe', age: 10, clan: 'Eagle Clan' }
    ],
    preferences: {
      emailNotifications: true,
      language: 'English',
      privacySettings: 'Family Only',
      theme: 'Light'
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  
  // State for managing family members
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [newChild, setNewChild] = useState({ name: '', age: '', clan: user.clan });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleAddChild = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log("New child to be added:", newChild);
    setShowAddChildForm(false);
    setNewChild({ name: '', age: '', clan: user.clan });
    // Here you would typically update the user.children array
  };

  return (
    <div className="profile-container">
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
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/family-tree">Family Tree</Link></li>
            <li><Link to="/documents">Documents</Link></li>
            <li><Link to="/stories">Stories</Link></li>
            <li><Link to="/profile" className="active">Profile</Link></li>
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

      <main className="profile-main">
        <div className="page-title-section">
          <h2>My Profile</h2>
          <p>Manage your personal information and account settings</p>
        </div>

        <div className="profile-content">
          <aside className="profile-sidebar">
            <div className="profile-avatar-large">
              <div className="avatar-placeholder">{user.name.charAt(0)}</div>
              <button className="change-avatar-button">Change Photo</button>
            </div>
            <div className="profile-name-rank">
              <h3>{user.name}</h3>
              <span className="profile-rank">{user.familyRank}</span>
              <span className="profile-clan">{user.clan}</span>
            </div>
            <div className="profile-tabs">
              <button 
                className={`profile-tab ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                Personal Info
              </button>
              <button 
                className={`profile-tab ${activeTab === 'family' ? 'active' : ''}`}
                onClick={() => setActiveTab('family')}
              >
                Family Details
              </button>
              <button 
                className={`profile-tab ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                Account & Security
              </button>
              <button 
                className={`profile-tab ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                Preferences
              </button>
              <button 
                className={`profile-tab ${activeTab === 'activity' ? 'active' : ''}`}
                onClick={() => setActiveTab('activity')}
              >
                Activity Log
              </button>
            </div>
          </aside>

          <div className="profile-details">
            {activeTab === 'info' && (
              <div className="profile-info-section">
                <h3>Personal Information</h3>
                <div className="info-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={user.name} />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={user.email} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" value={user.phone} />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" value={user.location} />
                  </div>
                  <div className="form-group">
                    <label>Clan</label>
                    <input type="text" value={user.clan} />
                  </div>
                  <div className="form-group">
                    <label>Marital Status</label>
                    <select defaultValue={user.maritalStatus}>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Biography</label>
                    <textarea rows="4" value={user.biography}></textarea>
                  </div>
                  <div className="form-actions">
                    <button className="save-button">Save Changes</button>
                    <button className="cancel-button">Cancel</button>
                  </div>
                </div>
                
                <div className="family-position-section">
                  <h3>Family Position</h3>
                  <div className="position-info">
                    <div className="info-item">
                      <span className="info-label">Family Role:</span>
                      <span className="info-value">{user.familyRank}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Member Since:</span>
                      <span className="info-value">{user.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'family' && (
              <div className="family-details-section">
                <h3>Family Details</h3>
                
                {/* Spouse Information */}
                <div className="spouse-information">
                  <h4>Spouse Information</h4>
                  {user.spouse ? (
                    <div className="spouse-details">
                      <div className="form-group">
                        <label>Spouse Name</label>
                        <input type="text" value={user.spouse.name} />
                      </div>
                      <div className="form-group">
                        <label>Spouse Clan</label>
                        <input type="text" value={user.spouse.clan} />
                      </div>
                      <div className="form-group">
                        <label>Spouse Family Role</label>
                        <input type="text" value={user.spouse.familyRank} />
                      </div>
                      <button className="edit-spouse-button">Edit Spouse Details</button>
                    </div>
                  ) : (
                    <div className="no-spouse">
                      <p>No spouse information available.</p>
                      <button className="add-spouse-button">Add Spouse</button>
                    </div>
                  )}
                </div>
                
                {/* Children Information */}
                <div className="children-information">
                  <h4>Children</h4>
                  {user.children && user.children.length > 0 ? (
                    <>
                      <div className="children-list">
                        {user.children.map((child, index) => (
                          <div className="child-card" key={index}>
                            <div className="child-avatar">{child.name.charAt(0)}</div>
                            <div className="child-details">
                              <h5>{child.name}</h5>
                              <p>Age: {child.age}</p>
                              <p>Clan: {child.clan}</p>
                            </div>
                            <button className="edit-child-button">Edit</button>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p>No children added yet.</p>
                  )}
                  
                  {!showAddChildForm ? (
                    <button 
                      className="add-family-button" 
                      onClick={() => setShowAddChildForm(true)}
                    >
                      Add Child
                    </button>
                  ) : (
                    <div className="add-child-form">
                      <h5>Add New Child</h5>
                      <form onSubmit={handleAddChild}>
                        <div className="form-group">
                          <label>Child's Name</label>
                          <input 
                            type="text" 
                            value={newChild.name} 
                            onChange={(e) => setNewChild({...newChild, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Age</label>
                          <input 
                            type="number" 
                            value={newChild.age} 
                            onChange={(e) => setNewChild({...newChild, age: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Clan</label>
                          <input 
                            type="text" 
                            value={newChild.clan} 
                            onChange={(e) => setNewChild({...newChild, clan: e.target.value})}
                          />
                        </div>
                        <div className="form-actions">
                          <button type="submit" className="save-button">Add Child</button>
                          <button 
                            type="button" 
                            className="cancel-button" 
                            onClick={() => setShowAddChildForm(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
                
                {/* Extended Family */}
                <div className="extended-family-section">
                  <h4>Extended Family Members</h4>
                  <p>Connect with other relatives in your family tree</p>
                  <button className="view-tree-button">View Family Tree</button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="security-section">
                <h3>Account & Security</h3>
                <div className="info-form">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={user.email} disabled />
                    <button className="change-button">Change Email</button>
                  </div>
                  <div className="password-section">
                    <h4>Password</h4>
                    <button className="change-button">Change Password</button>
                  </div>
                  <div className="two-factor-section">
                    <h4>Two-Factor Authentication</h4>
                    <div className="toggle-option">
                      <span>Enable Two-Factor Authentication</span>
                      <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  <div className="sessions-section">
                    <h4>Active Sessions</h4>
                    <div className="session-item">
                      <div className="session-details">
                        <span className="device-name">Chrome on Windows</span>
                        <span className="session-location">Portland, OR</span>
                        <span className="session-time">Current session</span>
                      </div>
                      <button className="session-button">This Device</button>
                    </div>
                    <button className="logout-all-button">Log Out of All Other Sessions</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="preferences-section">
                <h3>Preferences</h3>
                <div className="preference-group">
                  <h4>Notification Settings</h4>
                  <div className="toggle-option">
                    <span>Email Notifications</span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={user.preferences.emailNotifications} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-option">
                    <span>New Family Member Alerts</span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-option">
                    <span>New Document Alerts</span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                <div className="preference-group">
                  <h4>Privacy Settings</h4>
                  <div className="select-option">
                    <span>Who can see my information</span>
                    <select value={user.preferences.privacySettings}>
                      <option value="Family Only">Family Only</option>
                      <option value="Friends & Family">Friends & Family</option>
                      <option value="Public">Public</option>
                    </select>
                  </div>
                </div>
                <div className="preference-group">
                  <h4>Display Settings</h4>
                  <div className="select-option">
                    <span>Language</span>
                    <select value={user.preferences.language}>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                  <div className="select-option">
                    <span>Theme</span>
                    <select value={user.preferences.theme}>
                      <option value="Light">Light</option>
                      <option value="Dark">Dark</option>
                      <option value="System">System Default</option>
                    </select>
                  </div>
                </div>
                <div className="preference-actions">
                  <button className="save-button">Save Preferences</button>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="activity-section">
                <h3>Activity Log</h3>
                <div className="activity-filter">
                  <div className="filter-group">
                    <label>Filter by activity type:</label>
                    <select>
                      <option value="all">All Activities</option>
                      <option value="login">Login/Logout</option>
                      <option value="edit">Edits</option>
                      <option value="upload">Uploads</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Date range:</label>
                    <select>
                      <option value="week">Last 7 days</option>
                      <option value="month">Last 30 days</option>
                      <option value="year">Last year</option>
                      <option value="all">All time</option>
                    </select>
                  </div>
                </div>
                <div className="activity-timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon">📝</div>
                    <div className="timeline-content">
                      <div className="activity-description">Updated personal biography</div>
                      <div className="activity-time">March 1, 2025 at 10:23 AM</div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">🖼️</div>
                    <div className="timeline-content">
                      <div className="activity-description">Uploaded family photo to Documents</div>
                      <div className="activity-time">February 28, 2025 at 4:15 PM</div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">👤</div>
                    <div className="timeline-content">
                      <div className="activity-description">Added new family member: Elizabeth Doe (Aunt)</div>
                      <div className="activity-time">February 28, 2025 at 2:07 PM</div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">🔄</div>
                    <div className="timeline-content">
                      <div className="activity-description">Updated information for Robert Doe</div>
                      <div className="activity-time">February 25, 2025 at 11:45 AM</div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">📄</div>
                    <div className="timeline-content">
                      <div className="activity-description">Added document: Birth Certificate (Mary Doe)</div>
                      <div className="activity-time">February 20, 2025 at 3:30 PM</div>
                    </div>
                  </div>
                </div>
                <button className="load-more-button">Load More Activity</button>
              </div>
            )}
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
              <Link to="/family-tree">Family Tree</Link>
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

export default Profile;