import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Documents.css';
import deerLogo from './assets/deer-logo.svg';

const Documents = () => {
  // Mock document data - in a real app, this would come from an API
  const documents = [
    {
      id: 1,
      title: 'Birth Certificate',
      subject: 'Mary Doe',
      type: 'Certificate',
      date: 'June 15, 2010',
      addedBy: 'John Doe',
      addedDate: 'Feb 20, 2025',
      tags: ['birth', 'official', 'certificate'],
      thumbnailUrl: null
    },
    {
      id: 2,
      title: 'Marriage License',
      subject: 'Robert & Sarah Doe',
      type: 'Certificate',
      date: 'April 23, 1979',
      addedBy: 'John Doe',
      addedDate: 'Feb 10, 2025',
      tags: ['marriage', 'official', 'certificate'],
      thumbnailUrl: null
    },
    {
      id: 3,
      title: 'Family Reunion Photo',
      subject: 'Doe Family',
      type: 'Photo',
      date: 'July 04, 2022',
      addedBy: 'John Doe',
      addedDate: 'Jan 30, 2025',
      tags: ['photo', 'reunion', 'family'],
      thumbnailUrl: null
    },
    {
      id: 4,
      title: 'Grandfather\'s Journal',
      subject: 'James Doe Sr.',
      type: 'Journal',
      date: '1950-1970',
      addedBy: 'Robert Doe',
      addedDate: 'Jan 15, 2025',
      tags: ['journal', 'memoir', 'personal'],
      thumbnailUrl: null
    },
    {
      id: 5,
      title: 'Family Recipe Collection',
      subject: 'Eleanor Doe',
      type: 'Recipe Book',
      date: '1940-1980',
      addedBy: 'Sarah Doe',
      addedDate: 'Jan 05, 2025',
      tags: ['recipe', 'tradition', 'cooking'],
      thumbnailUrl: null
    }
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [currentView, setCurrentView] = useState('grid'); // 'grid' or 'list'

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleView = (view) => {
    setCurrentView(view);
  };

  // Filter documents based on search and type
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Get unique document types for the filter
  const documentTypes = ['All', ...new Set(documents.map(doc => doc.type))];

  return (
    <div className="documents-container">
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
            <li><Link to="/documents" className="active">Documents</Link></li>
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
              <Link to="/settings">Settings & Preferences</Link>
              <Link to="/help">Help Center</Link>
              <Link to="/">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="documents-main">
        <div className="page-title-section">
          <h2>Family Documents</h2>
          <p>Preserve and manage your important family documents</p>
        </div>

        <div className="documents-controls">
          <div className="search-filter-container">
            <div className="document-search">
              <input 
                type="text" 
                placeholder="Search documents..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button">🔍</button>
            </div>
            <div className="document-filter">
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {documentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="document-view-controls">
            <button 
              className={`view-button ${currentView === 'grid' ? 'active' : ''}`}
              onClick={() => toggleView('grid')}
            >
              ⊞ Grid
            </button>
            <button 
              className={`view-button ${currentView === 'list' ? 'active' : ''}`}
              onClick={() => toggleView('list')}
            >
              ≡ List
            </button>
          </div>
          <button className="upload-button">
            <span>+</span> Upload Document
          </button>
        </div>

        {currentView === 'grid' ? (
          <div className="documents-grid">
            {filteredDocuments.length === 0 ? (
              <div className="no-documents">
                <p>No documents found. Try adjusting your search or filters.</p>
              </div>
            ) : (
              filteredDocuments.map(doc => (
                <div key={doc.id} className="document-card">
                  <div className="document-thumbnail">
                    {doc.thumbnailUrl ? (
                      <img src={doc.thumbnailUrl} alt={doc.title} />
                    ) : (
                      <div className="document-icon">
                        {doc.type === 'Certificate' && '📜'}
                        {doc.type === 'Photo' && '📷'}
                        {doc.type === 'Journal' && '📔'}
                        {doc.type === 'Recipe Book' && '📒'}
                        {!['Certificate', 'Photo', 'Journal', 'Recipe Book'].includes(doc.type) && '📄'}
                      </div>
                    )}
                  </div>
                  <div className="document-info">
                    <h3 className="document-title">{doc.title}</h3>
                    <p className="document-subject">{doc.subject}</p>
                    <div className="document-meta">
                      <span className="document-type">{doc.type}</span>
                      <span className="document-date">{doc.date}</span>
                    </div>
                    <div className="document-tags">
                      {doc.tags.map(tag => (
                        <span key={tag} className="document-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="document-actions">
                    <button className="doc-action-button">View</button>
                    <button className="doc-action-button">Download</button>
                    <button className="doc-action-button">Share</button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="documents-list">
            <table className="documents-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Added By</th>
                  <th>Added Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-documents-row">
                      No documents found. Try adjusting your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map(doc => (
                    <tr key={doc.id}>
                      <td>{doc.title}</td>
                      <td>{doc.subject}</td>
                      <td>{doc.type}</td>
                      <td>{doc.date}</td>
                      <td>{doc.addedBy}</td>
                      <td>{doc.addedDate}</td>
                      <td className="document-table-actions">
                        <button className="table-action-btn">View</button>
                        <button className="table-action-btn">Download</button>
                        <button className="table-action-btn">Share</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
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

export default Documents;