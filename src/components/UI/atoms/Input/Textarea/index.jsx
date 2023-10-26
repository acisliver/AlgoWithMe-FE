import React from 'react';

function Textarea({ placeholder = '', value, onChange, className = '' }) {
  const defaultClasses = 'bg-gray-200 border border-gray-300 py-2 px-4 rounded';
  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={combinedClasses}
     />
  );
}

export default Textarea;
