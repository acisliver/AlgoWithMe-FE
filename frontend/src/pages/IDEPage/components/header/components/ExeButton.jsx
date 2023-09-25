import React from "react";

const ExeButton = (props) => {
  return (
    <button
      className={`rounded-md py-1 px-5 ${
        props.running
          ? "bg-[#2C3243] text-[#C3C8CC]"
          : "bg-[#349B44] hover:bg-[#4cde62] text-[#f4f4f4] hover:text-[#f2f9f2]"
      }`}
      onClick={props.toggleRunning}
    >
      {props.running ? "Stop" : "Run"}
    </button>
  );
};

export default ExeButton;
