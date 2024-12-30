/**
 * Security utility functions
 */

// HTML encoding for strings that might contain special characters
export const encodeHTML = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, (match) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[match];
  });
};

// Sanitize user input before using in DOM
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Validate and sanitize URLs
export const sanitizeURL = (url) => {
  try {
    const parsed = new URL(url);
    // Only allow specific protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return parsed.toString();
  } catch {
    return '';
  }
};

// CSP configuration helper
export const getCSPConfig = () => {
  return {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"], // For React development
    'style-src': ["'self'", "'unsafe-inline'"], // For styled-components
    'img-src': ["'self'", 'https://images.unsplash.com', 'data:'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'connect-src': ["'self'"],
    'frame-ancestors': ["'none'"],
    'form-action': ["'self'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"]
  };
};

// Local storage security wrapper
export const secureStorage = {
  setItem: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(encodeHTML(key), encodeHTML(serializedValue));
    } catch (error) {
      console.error('Error setting secure storage:', error);
    }
  },
  
  getItem: (key) => {
    try {
      const value = localStorage.getItem(encodeHTML(key));
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting secure storage:', error);
      return null;
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(encodeHTML(key));
    } catch (error) {
      console.error('Error removing from secure storage:', error);
    }
  }
};
