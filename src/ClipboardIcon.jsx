import React from 'react';

const ClipboardIcon = ({ className = '', style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    width="24"
    height="24"
  >
    <rect x="4" y="4" width="16" height="16" rx="3"/>
    <path d="M9 9l1 1 3-3" />
    <path d="M9 13l1 1 3-3" />
    <path d="M9 17l1 1 3-3" />
    <rect x="8" y="2" width="8" height="4" rx="1"/>
  </svg>
);

export default ClipboardIcon; 