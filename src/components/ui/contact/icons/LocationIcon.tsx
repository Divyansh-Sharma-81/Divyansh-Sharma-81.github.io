import React from 'react';

const LocationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.057l-1.18-1.18a15.475 15.475 0 01-4.09 3.322.75.75 0 01-.832 0 15.475 15.475 0 01-4.09-3.322l-1.18 1.18a16.973 16.973 0 005.16 4.057zM12 1.5a6.75 6.75 0 00-6.75 6.75c0 3.834 2.97 9.143 6.19 12.422a.75.75 0 00.938.085c.018-.012.036-.025.053-.039 3.22-3.279 6.19-8.588 6.19-12.422A6.75 6.75 0 0012 1.5zM12 12a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);

export default LocationIcon;