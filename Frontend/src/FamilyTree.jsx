import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FamilyTree.css';
import deerLogo from './assets/deer-logo.svg';

const FamilyTree = () => {
  // Updated family data structure to prioritize male lineage
  const familyData = {
    // Male head of family (Root)
    patriarch: {
      id: 2,
      name: 'Robert Doe',
      birthYear: '1955',
      deathYear: null,
      imageUrl: null,
      relationship: 'Patriarch',
      spouse: {
        id: 3,
        name: 'Sarah Doe',
        birthYear: '1958',
        deathYear: null,
        imageUrl: null,
        relationship: 'Spouse',
      },
      parents: {
        father: {
          id: 7,
          name: 'James Doe Sr.',
          birthYear: '1930',
          deathYear: '2015',
          imageUrl: null,
          relationship: 'Father',
          spouse: {
            id: 8,
            name: 'Eleanor Doe',
            birthYear: '1933',
            deathYear: null,
            imageUrl: null,
            relationship: 'Spouse',
          }
        }
      },
      children: [
        {
          id: 1,
          name: 'John Doe',
          birthYear: '1980',
          deathYear: null,
          imageUrl: null,
          gender: 'male',
          relationship: 'Son',
          children: [
            {
              id: 6,
              name: 'Thomas Doe',
              birthYear: '2012',
              deathYear: null,
              imageUrl: null,
              gender: 'male',
              relationship: 'Son',
              children: []
            },
            {
              id: 5,
              name: 'Mary Doe',
              birthYear: '2010',
              deathYear: null,
              imageUrl: null,
              gender: 'female',
              relationship: 'Daughter',
              children: []
            }
          ]
        },
        {
          id: 4,
          name: 'James Doe',
          birthYear: '1983',
          deathYear: null,
          imageUrl: null,
          gender: 'male',
          relationship: 'Son',
          children: []
        }
      ]
    }
  };

  const [viewMode, setViewMode] = useState('table'); // 'tree', 'table', or 'code'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState({});

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleNodeExpansion = (id) => {
    setExpandedNodes({
      ...expandedNodes,
      [id]: !expandedNodes[id]
    });
  };

  // Render code format version of the family tree
  const renderCodeFormatTree = () => {
    const renderFamilyMember = (member, level = 0, isLast = true, parentPrefix = '') => {
      const indent = '  '.repeat(level);
      const prefix = level === 0 ? '' : parentPrefix + (isLast ? '└── ' : '├── ');
      const childPrefix = level === 0 ? '' : parentPrefix + (isLast ? '    ' : '│   ');
      
      const hasChildren = member.children && member.children.length > 0;
      const isExpanded = expandedNodes[member.id] || level === 0;
      
      return (
        <div key={member.id} className="code-node">
          <div 
            className="code-line"
            onClick={() => hasChildren && toggleNodeExpansion(member.id)}
          >
            <span className="code-prefix">{prefix}</span>
            <span className="member-name">{member.name}</span>
            <span className="code-dates">
              ({member.birthYear} - {member.deathYear || 'Present'})
            </span>
            {member.relationship && 
              <span className="code-relation"> | {member.relationship}</span>
            }
            {hasChildren && (
              <span className="toggle-indicator">
                {isExpanded ? ' [-]' : ' [+]'}
              </span>
            )}
          </div>
          
          {member.spouse && isExpanded && (
            <div className="code-line spouse-line">
              <span className="code-prefix">{childPrefix}│</span>
              <span className="code-married">married to</span>
              <span className="member-name"> {member.spouse.name}</span>
              <span className="code-dates">
                ({member.spouse.birthYear} - {member.spouse.deathYear || 'Present'})
              </span>
            </div>
          )}
          
          {hasChildren && isExpanded && (
            <div className="children-container">
              {member.children
                // Sort to put males first
                .sort((a, b) => {
                  if (a.gender === 'male' && b.gender !== 'male') return -1;
                  if (a.gender !== 'male' && b.gender === 'male') return 1;
                  return a.birthYear - b.birthYear;
                })
                .map((child, index, array) => 
                  renderFamilyMember(
                    child, 
                    level + 1, 
                    index === array.length - 1,
                    childPrefix
                  )
                )
              }
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="code-format-container">
        <div className="code-header">
          <h3>Family Tree Code Format (Male Lineage Priority)</h3>
          <div className="code-legend">
            <span className="legend-item">
              <span className="legend-symbol male"></span> Male
            </span>
            <span className="legend-item">
              <span className="legend-symbol female"></span> Female
            </span>
            <span className="legend-item">
              <span className="legend-indicator">[+]</span> Expandable
            </span>
            <span className="legend-item">
              <span className="legend-indicator">[-]</span> Collapsible
            </span>
          </div>
        </div>
        <div className="code-tree">
          {renderFamilyMember(familyData.patriarch)}
        </div>
      </div>
    );
  };

  // Render table format that prioritizes male lineage
  const renderPatrilinealTable = () => {
    // Helper function to create rows recursively
    const createTableRows = (member, depth = 0, inheritedLineage = '') => {
      const lineage = inheritedLineage ? 
        `${inheritedLineage} > ${member.name}` : 
        member.name;
      
      const rows = [];
      
      // Add the current member
      rows.push(
        <tr key={member.id} className={member.gender === 'male' ? 'male-row' : 'female-row'}>
          <td style={{ paddingLeft: `${depth * 20}px` }}>
            {member.gender === 'male' ? '♂ ' : '♀ '}
            {member.name}
          </td>
          <td>{member.birthYear}</td>
          <td>{member.deathYear || 'Present'}</td>
          <td>{member.relationship}</td>
          <td>{lineage}</td>
          <td>
            <button className="table-action-btn">View</button>
            <button className="table-action-btn">Edit</button>
          </td>
        </tr>
      );
      
      // Add spouse if exists
      if (member.spouse) {
        rows.push(
          <tr key={`spouse-${member.spouse.id}`} className="spouse-row">
            <td style={{ paddingLeft: `${depth * 20 + 20}px` }}>
              ♀ {member.spouse.name}
            </td>
            <td>{member.spouse.birthYear}</td>
            <td>{member.spouse.deathYear || 'Present'}</td>
            <td>{member.spouse.relationship || 'Spouse'}</td>
            <td>{lineage} (spouse)</td>
            <td>
              <button className="table-action-btn">View</button>
              <button className="table-action-btn">Edit</button>
            </td>
          </tr>
        );
      }
      
      // Add children if they exist (prioritizing males)
      if (member.children && member.children.length > 0) {
        // Sort to put males first
        const sortedChildren = [...member.children].sort((a, b) => {
          if (a.gender === 'male' && b.gender !== 'male') return -1;
          if (a.gender !== 'male' && b.gender === 'male') return 1;
          return a.birthYear - b.birthYear;
        });
        
        sortedChildren.forEach(child => {
          rows.push(...createTableRows(child, depth + 1, lineage));
        });
      }
      
      return rows;
    };
    
    // Add patriarch's father's information if available
    const allRows = [];
    if (familyData.patriarch.parents && familyData.patriarch.parents.father) {
      allRows.push(...createTableRows(familyData.patriarch.parents.father));
    }
    
    // Now add patriarch and his descendants
    allRows.push(...createTableRows(familyData.patriarch));
    
    return (
      <div className="patri-table-container">
        <h3>Patrilineal Family Tree</h3>
        <table className="family-table patrilineal">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Year</th>
              <th>Death Year</th>
              <th>Relationship</th>
              <th>Lineage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRows}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="family-tree-container">
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
            <li><Link to="/family-tree" className="active">Family Tree</Link></li>
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
              <Link to="/settings">Settings & Preferences</Link>
              <Link to="/help">Help Center</Link>
              <Link to="/">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="family-tree-main">
        <div className="page-title-section">
          <h2>Patrilineal Family Tree</h2>
          <p>Explore your family's male lineage and connections across generations</p>
        </div>

        <div className="controls-section">
          <div className="view-toggles">
            <button 
              className={`view-toggle ${viewMode === 'tree' ? 'active' : ''}`}
              onClick={() => setViewMode('tree')}
            >
              <span className="toggle-icon">🌳</span>
              Tree View
            </button>
            <button 
              className={`view-toggle ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <span className="toggle-icon">📋</span>
              Table View
            </button>
            <button 
              className={`view-toggle ${viewMode === 'code' ? 'active' : ''}`}
              onClick={() => setViewMode('code')}
            >
              <span className="toggle-icon">📝</span>
              Code View
            </button>
          </div>
          <div className="action-buttons">
            <button className="action-button">
              <span className="action-icon">👤</span>
              Add Member
            </button>
            <button className="action-button">
              <span className="action-icon">🔍</span>
              Search
            </button>
            <button className="action-button">
              <span className="action-icon">⬇️</span>
              Export
            </button>
          </div>
        </div>

        {viewMode === 'tree' && (
          <div className="tree-view-container">
            <div className="tree-message">
              <p>Tree visualization focuses on patrilineal descent. Click on male members to expand their families.</p>
            </div>
            {/* Tree visualization would go here */}
          </div>
        )}
        
        {viewMode === 'table' && renderPatrilinealTable()}
        
        {viewMode === 'code' && renderCodeFormatTree()}
      </main>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-branding">
            <img src={deerLogo} alt="Deer Totem" className="footer-logo" />
            <p>KALYAKO HERITAGE</p>
            <p className="footer-tagline">Preserving your family's legacy through the male line</p>
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

export default FamilyTree;