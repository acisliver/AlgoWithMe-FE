import React from 'react';

function Button({ children, type = 'button', className = '' }) {
  const defaultClasses = 'flex items-center justify-center w-full h-8 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl';

  const colorClasses = className.includes('bg-white') ? '' : 'bg-blue-400 hover:bg-blue-600 text-white';

  const combinedClasses = `${defaultClasses} ${colorClasses} ${className}`;
  
  return (
    <button className={combinedClasses} type={type}>
      {children}
    </button>
  );
}

export default Button;
