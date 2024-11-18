import React, { useState, useEffect, useRef } from 'react';

const DisplayDropdown = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={styles.container}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.displayButton}
      >
        <span>Display</span>
        <svg 
          style={styles.chevron} 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M4 6L8 10L12 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div style={styles.dropdownPanel}>
          <div style={styles.optionGroup}>
            <label style={styles.label}>Grouping</label>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
              style={styles.select}
            >
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div style={styles.optionGroup}>
            <label style={styles.label}>Ordering</label>
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              style={styles.select}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles object
const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  displayButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#373737',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  chevron: {
    width: '16px',
    height: '16px',
    transition: 'transform 0.2s ease',
  },
  dropdownPanel: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: '0',
    width: '200px',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    padding: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  optionGroup: {
    marginBottom: '12px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    color: '#6B7280',
    marginBottom: '4px',
  },
  select: {
    width: '100%',
    padding: '6px 8px',
    fontSize: '14px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default DisplayDropdown;