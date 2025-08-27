import React from 'react';

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5.25 2.25a3 3 0 00-3 3v13.5a3 3 0 003 3h13.5a3 3 0 003-3V5.25a3 3 0 00-3-3H5.25zm1.5 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm3 0a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm5.25.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM6.75 15a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm3 0a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm5.25.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM9 5.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z"
      clipRule="evenodd"
    />
  </svg>
);

export default CalendarIcon;