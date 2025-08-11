import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Stories.css';
import deerLogo from '../assets/deer-logo.svg';

const Stories = () => {
  // Mock stories data - in a real app, this would come from an API
  const stories = [
    {
      id: 1,
      title: 'The Great Migration',
      subject: 'Kalya Family',
      author: 'Robert Rutto',
      date: 'Feb 15, 2025',
      excerpt: 'In 1968, our family made the difficult decision to leave Chicago and move west to Portland. The journey was challenging but ultimately rewarding...',
      tags: ['migration', 'family history', '1960s'],
      imageUrl: null,
      mediaType: 'text'
    },
    {
      id: 2,
      title: 'Opening the Family Business',
      subject: 'Kalya\'s Hardware Store',
      author: 'John Bett',
      date: 'Jan 25, 2025',
      excerpt: 'Grandfather James always dreamed of owning his own business. In 1992, that dream became reality when we opened Doe\'s Hardware Store...',
      tags: ['business', 'entrepreneurship', '1990s'],
      imageUrl: null,
      mediaType: 'text'
    },
    {
      id: 3,
      title: 'Grandmother\'s Cooking Lessons',
      subject: '',
      author: 'Fred Kiprono',
      date: 'Jan 10, 2025',
      excerpt: 'Some of my fondest childhood memories are of spending Sunday afternoons in Grandmother Eleanor\'s kitchen, learning her secret recipes...',
      tags: ['traditions', 'cooking', 'memories'],
      imageUrl: null,
      mediaType: 'audio'
    },
    {
      id: 4,
      title: 'Summer at the Lake House',
      subject: 'Family Vacations',
      author: 'James Tanui',
      date: 'Dec 20, 2024',
      excerpt: 'Every summer from 1985 to 1995, our entire extended family would gather at the lake house in Minnesota for two weeks of swimming, fishing, and bonding...',
      tags: ['vacations', 'traditions', '1980s'],
      imageUrl: null,
      mediaType: 'video'
    }
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedMediaType, setSelectedMediaType] = useState('All');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Get all unique tags for the filter
  const allTags = ['All', ...new Set(stories.flatMap(story => story.tags))];
  const mediaTypes = ['All', 'text', 'audio', 'video'];

  // Filter stories based on search, tag, and media type
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || story.tags.includes(selectedTag);
    const matchesMediaType = selectedMediaType === 'All' || story.mediaType === selectedMediaType;
    return matchesSearch && matchesTag && matchesMediaType;
  });

  return (
    <div className="stories-container">
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
            <li><Link to="/stories" className="active">Stories</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <div className="user-profile">
            <div className="user-avatar">K</div>
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

      <main className="stories-main">
        <div className="page-title-section">
          <h2>Family Stories</h2>
          <p>Capture and share the memories that define your family's journey</p>
        </div>

        <div className="stories-controls">
          <div className="search-filter-container">
            <div className="story-search">
              <input 
                type="text" 
                placeholder="Search stories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button">🔍</button>
            </div>
            <div className="story-filters">
              <select 
                value={selectedTag} 
                onChange={(e) => setSelectedTag(e.target.value)}
                className="tag-filter"
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <select 
                value={selectedMediaType} 
                onChange={(e) => setSelectedMediaType(e.target.value)}
                className="media-type-filter"
              >
                {mediaTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Media Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="create-button">
            <span>+</span> Create Story
          </button>
        </div>

        <div className="stories-grid">
          {filteredStories.length === 0 ? (
            <div className="no-stories">
              <p>No stories found. Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredStories.map(story => (
              <div key={story.id} className="story-card">
                <div className="story-media">
                  {story.imageUrl ? (
                    <img src={story.imageUrl} alt={story.title} />
                  ) : (
                    <div className="story-media-placeholder">
                      {story.mediaType === 'text' && '📝'}
                      {story.mediaType === 'audio' && '🎙️'}
                      {story.mediaType === 'video' && '🎬'}
                    </div>
                  )}
                  <div className="media-type-badge">{story.mediaType}</div>
                </div>
                <div className="story-content">
                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-subject">{story.subject}</p>
                  <p className="story-excerpt">{story.excerpt}</p>
                  <div className="story-meta">
                    <span className="story-author">By {story.author}</span>
                    <span className="story-date">{story.date}</span>
                  </div>
                  <div className="story-tags">
                    {story.tags.map(tag => (
                      <span key={tag} className="story-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="story-actions">
                  <button className="story-action-button">Read</button>
                  <button className="story-action-button">Share</button>
                  <button className="story-action-button">Edit</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="create-story-prompt">
          <div className="prompt-content">
            <h3>Have a family story to share?</h3>
            <p>Preserve your family's legacy by recording your memories, traditions, and important moments</p>
            <div className="prompt-buttons">
              <button className="prompt-button">Write a Story</button>
              <button className="prompt-button">Record Audio</button>
              <button className="prompt-button">Record Video</button>
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

export default Stories;