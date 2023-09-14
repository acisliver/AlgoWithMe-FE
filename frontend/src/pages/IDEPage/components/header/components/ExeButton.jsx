import React from "react";

const ExeButton = (props) => {
  return (
    <button
      className={`rounded-md py-1 px-3 ${
        props.running ? "bg-[#2C3243] text-[#C3C8CC]" : "bg-[#1E4919] text-[#CCFDCE]"
      }`} 
      onClick={props.toggleRunning}
    >
      {props.running ? "Stop" : "Run"}
    </button>
  );
};

export default ExeButton;
