import React from "react";

const ProjectTitleButton = () => {
  return (
    <button className="flex items-center bg-[#BDBDBD] rounded-xl py-2 px-2">
      <img
        src="src/assets/view-list.svg"
        alt="view list icon"
        className="w-6 h-6 mr-2"
      />
      <span className="px-1 truncate max-w-[150px] block">ProjectNameExample</span> {/* 수정된 부분 */}
    </button>
  );
};

export default ProjectTitleButton;
