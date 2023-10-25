import React from 'react';

function Button({ children, type = 'button', className = '' }) {
  const defaultClasses = 'bg-blue-500 text-white py-2 px-4 rounded';
  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <button className={combinedClasses} type={type}>
      {children}
    </button>
  );
}

export default Button;
