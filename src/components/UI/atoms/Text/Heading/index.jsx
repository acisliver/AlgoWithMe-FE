import React from 'react';

function Heading({ level = '1', children, className = '' }) {
  const Tag = `h${level}`;
  const defaultClasses = 'text-gray-800 font-semibold';

  const combinedClasses = `${defaultClasses} ${className}`;

  return <Tag className={combinedClasses}>{children}</Tag>;
}

export default Heading;
