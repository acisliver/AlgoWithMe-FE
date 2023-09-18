import React from 'react';
import CloseButton from "./CloseButton";

const Tab = ({ isActive, label, onClick, onClose }) => {
  return (
    <li className="w-auto z-10 border-r border-gray-700 relative h-full">
      <a
        onClick={onClick}
        className={`text-sm font-bold h-full ${isActive ? 'bg-[#2C3243] pt-0 pb-0 border-t-2 border-[#609AE2] text-[#609AE2]' : 'text-[#C3C8CC]'} 
                   px-10 py-0 border-b-0 box-border whitespace-nowrap text-center align-middle justify-center h-full`}
      >
        <span className="tab-title overflow-hidden truncate w-auto flex-1">{label}</span>
      </a>
      <button 
        className="absolute top-0 right-0 mt-2 mr-2 text-[#609AE2]" 
        onClick={onClose}
      >
        <CloseButton isActive={isActive} />
      </button>
    </li>
  );
};

export default Tab;
