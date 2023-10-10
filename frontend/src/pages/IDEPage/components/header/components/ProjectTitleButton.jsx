import React from "react";

const ProjectTitleButton = (props) => {


  return (
    <button onClick={() => {
        props.onProjectClick(true);
    }} className="flex items-center bg-[#BDBDBD] rounded-xl py-2 px-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list"
           viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
      <span className="px-1 truncate max-w-[150px] block">ProjectNameExample</span> {/* 수정된 부분 */}
    </button>
  );
};

export default ProjectTitleButton;
