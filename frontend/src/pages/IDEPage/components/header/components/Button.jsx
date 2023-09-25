import React from "react";

const Button = (props) => {
  return (
    <button className="bg-[#4597F7] hover:bg-[#81b5f0] text-white rounded-md py-1 px-3">
      {props.name}
    </button>
  );
};

export default Button;
