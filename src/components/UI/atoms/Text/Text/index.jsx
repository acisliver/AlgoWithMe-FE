import React from 'react';

function Text({ children, className = '' }) {
  const defaultClasses = 'text-gray-600';

  const combinedClasses = `${defaultClasses} ${className}`;

  return <span className={combinedClasses}>{children}</span>;
}

export default Text;
