import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';
import deerLogo from '../assets/deer-logo.svg';

const Settings = () => {
  // Mock settings data - in a real app, this would come from your user's settings
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      familyUpdates: true,
      documentUpdates: true,
      storyUpdates: true,
      weeklyDigest: false,
      eventReminders: true
    },
    privacy: {
      profileVisibility: 'Family Only',
      documentSharing: 'Family Only',
      storySharing: 'Family Only',
      allowSearchListing: false,
      allowDataCollection: true
    },
    display: {
      language: 'English',
      theme: 'Light',
      fontSize: 'Medium',
      colorblindMode: false,
      highContrastMode: false
    },
    backup: {
      autoBackup: false,
      backupFrequency: 'Monthly',
      lastBackup: 'Never'
    },
    subscription: {
      currentPlan: 'Family Plus',
      renewalDate: 'March 15, 2025',
      autoRenew: true
    }
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('notifications');
  const [notification, setNotification] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSettingChange = (category, setting, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [setting]: value
      }
    }));
  };

  const handleSelectChange = (category, setting, event) => {
    const value = event.target.value;
    handleSettingChange(category, setting, value);
  };

  const saveSettings = () => {
    // In a real app, you would save these settings to your backend
    setNotification({
      type: 'success',
      message: 'Settings saved successfully!'
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="settings-container">
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
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <div className="user-profile">
            <div className="user-avatar">J</div>
            <span className="user-rank">Parent</span>
            <div className="user-menu-dropdown">
              <Link to="/profile">My Profile</Link>
              <Link to="/settings" className="active">Settings & Preferences</Link>
              <Link to="/help">Help Center</Link>
              <Link to="/">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="settings-main">
        <div className="page-title-section">
          <h2>Settings & Preferences</h2>
          <p>Customize your experience with Kalyako Heritage</p>
        </div>

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="settings-content">
          <aside className="settings-sidebar">
            <div className="settings-categories">
              <button 
                className={`settings-category ${activeCategory === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveCategory('notifications')}
              >
                Notifications
              </button>
              <button 
                className={`settings-category ${activeCategory === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveCategory('privacy')}
              >
                Privacy & Sharing
              </button>
              <button 
                className={`settings-category ${activeCategory === 'display' ? 'active' : ''}`}
                onClick={() => setActiveCategory('display')}
              >
                Display & Accessibility
              </button>
              <button 
                className={`settings-category ${activeCategory === 'backup' ? 'active' : ''}`}
                onClick={() => setActiveCategory('backup')}
              >
                Data & Backup
              </button>
              <button 
                className={`settings-category ${activeCategory === 'subscription' ? 'active' : ''}`}
                onClick={() => setActiveCategory('subscription')}
              >
                Subscription
              </button>
            </div>
          </aside>

          <div className="settings-options">
            {activeCategory === 'notifications' && (
              <div className="notification-settings">
                <h3>Notification Settings</h3>
                <p className="settings-description">Control how and when you receive notifications about your family heritage</p>
                
                <div className="settings-section">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Email Notifications</h4>
                      <p>Receive notifications via email</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Family Updates</h4>
                      <p>Get notified when family members add new information</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.familyUpdates}
                          onChange={(e) => handleSettingChange('notifications', 'familyUpdates', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Document Updates</h4>
                      <p>Get notified when new documents are added</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.documentUpdates}
                          onChange={(e) => handleSettingChange('notifications', 'documentUpdates', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Story Updates</h4>
                      <p>Get notified when new stories are shared</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.storyUpdates}
                          onChange={(e) => handleSettingChange('notifications', 'storyUpdates', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Weekly Digest</h4>
                      <p>Receive a weekly summary of all family activities</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.weeklyDigest}
                          onChange={(e) => handleSettingChange('notifications', 'weeklyDigest', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Event Reminders</h4>
                      <p>Receive reminders for birthdays, anniversaries and other events</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.eventReminders}
                          onChange={(e) => handleSettingChange('notifications', 'eventReminders', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'privacy' && (
              <div className="privacy-settings">
                <h3>Privacy & Sharing Settings</h3>
                <p className="settings-description">Control who can see your content and how your data is shared</p>
                
                <div className="settings-section">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Profile Visibility</h4>
                      <p>Who can see your profile information</p>
                    </div>
                    <div className="setting-control">
                      <select 
                        value={settings.privacy.profileVisibility}
                        onChange={(e) => handleSelectChange('privacy', 'profileVisibility', e)}
                      >
                        <option value="Family Only">Family Only</option>
                        <option value="Extended Family">Extended Family</option>
                        <option value="All Members">All Members</option>
                        <option value="Public">Public</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Document Sharing</h4>
                      <p>Who can see documents you upload</p>
                    </div>
                    <div className="setting-control">
                      <select 
                        value={settings.privacy.documentSharing}
                        onChange={(e) => handleSelectChange('privacy', 'documentSharing', e)}
                      >
                        <option value="Family Only">Family Only</option>
                        <option value="Extended Family">Extended Family</option>
                        <option value="All Members">All Members</option>
                        <option value="Public">Public</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Story Sharing</h4>
                      <p>Who can see stories you share</p>
                    </div>
                    <div className="setting-control">
                      <select 
                        value={settings.privacy.storySharing}
                        onChange={(e) => handleSelectChange('privacy', 'storySharing', e)}
                      >
                        <option value="Family Only">Family Only</option>
                        <option value="Extended Family">Extended Family</option>
                        <option value="All Members">All Members</option>
                        <option value="Public">Public</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Allow Search Listing</h4>
                      <p>Allow your profile to be found in search</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.privacy.allowSearchListing}
                          onChange={(e) => handleSettingChange('privacy', 'allowSearchListing', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Allow Data Collection</h4>
                      <p>Allow us to collect usage data to improve our service</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.privacy.allowDataCollection}
                          onChange={(e) => handleSettingChange('privacy', 'allowDataCollection', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'display' && (
              <div className="display-settings">
                <h3>Display & Accessibility Settings</h3>
                <p className="settings-description">Customize how Kalyako Heritage appears and functions for you</p>
                
                <div className="settings-section">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Language</h4>
                      <p>Set your preferred language</p>
                    </div>
                    <div className="setting-control">
                      <select 
                        value={settings.display.language}
                        onChange={(e) => handleSelectChange('display', 'language', e)}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Theme</h4>
                      <p>Choose your visual theme</p>
                    </div>
                    <div className="setting-control">
                      <select 
                        value={settings.display.theme}
                        onChange={(e) => handleSelectChange('display', 'theme', e)}
                      >
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                        <option value="Heritage">Heritage</option>
                        <option value="System">System Default</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Font Size</h4>
                      <p>Adjust text size for better readability</p>
                    </div>
                    <div className="setting-control">
                      <select 
                        value={settings.display.fontSize}
                        onChange={(e) => handleSelectChange('display', 'fontSize', e)}
                      >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="X-Large">X-Large</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Colorblind Mode</h4>
                      <p>Optimize colors for colorblind users</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.display.colorblindMode}
                          onChange={(e) => handleSettingChange('display', 'colorblindMode', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>High Contrast Mode</h4>
                      <p>Increase contrast for better visibility</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.display.highContrastMode}
                          onChange={(e) => handleSettingChange('display', 'highContrastMode', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'backup' && (
              <div className="backup-settings">
                <h3>Data & Backup Settings</h3>
                <p className="settings-description">Manage your data and backup preferences</p>
                
                <div className="settings-section">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Auto Backup</h4>
                      <p>Automatically backup your data</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.backup.autoBackup}
                          onChange={(e) => handleSettingChange('backup', 'autoBackup', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Backup Frequency</h4>
                      <p>How often your data should be backed up</p>
                    </div>
                    <div className="setting-control">
                      <select 
                        value={settings.backup.backupFrequency}
                        onChange={(e) => handleSelectChange('backup', 'backupFrequency', e)}
                        disabled={!settings.backup.autoBackup}
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Last Backup</h4>
                      <p>{settings.backup.lastBackup}</p>
                    </div>
                    <div className="setting-control">
                      <button className="backup-button">Backup Now</button>
                    </div>
                  </div>
                  
                  <div className="setting-item data-export">
                    <div className="setting-info">
                      <h4>Export Your Data</h4>
                      <p>Download all your data in a portable format</p>
                    </div>
                    <div className="setting-control">
                      <button className="export-button">Export Data</button>
                    </div>
                  </div>
                  
                  <div className="setting-item data-delete">
                    <div className="setting-info">
                      <h4>Delete Your Data</h4>
                      <p>Permanently remove all your data from our servers</p>
                    </div>
                    <div className="setting-control">
                      <button className="delete-button">Delete Data</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'subscription' && (
              <div className="subscription-settings">
                <h3>Subscription Settings</h3>
                <p className="settings-description">Manage your subscription plan and billing</p>
                
                <div className="settings-section">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Current Plan</h4>
                      <p>{settings.subscription.currentPlan}</p>
                    </div>
                    <div className="setting-control">
                      <button className="upgrade-button">Change Plan</button>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Renewal Date</h4>
                      <p>Your subscription will renew on {settings.subscription.renewalDate}</p>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Auto Renewal</h4>
                      <p>Automatically renew your subscription</p>
                    </div>
                    <div className="setting-control">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.subscription.autoRenew}
                          onChange={(e) => handleSettingChange('subscription', 'autoRenew', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Billing Information</h4>
                      <p>Update your payment methods and billing address</p>
                    </div>
                    <div className="setting-control">
                      <button className="billing-button">Manage Billing</button>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Billing History</h4>
                      <p>View your past invoices and payments</p>
                    </div>
                    <div className="setting-control">
                      <button className="history-button">View History</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="settings-actions">
          <button className="save-button" onClick={saveSettings}>Save Changes</button>
          <button className="cancel-button">Cancel</button>
        </div>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/help">Help Center</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="copyright">
          © 2025 Kalyako Heritage. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Settings;