import React from "react";
import Button from "./components/Button";

const index = () => {
  return (
    <header className="flex justify-between py-2 px-4 bg-[#0F1524]">
      <div className="flex w-1/3">
        <div className=" bg-black text-white">userA</div>
      </div>
      <div className="flex w-1/5 justify-center">
        <button className="bg-[#1E4919] hover:bg-green-300 rounded-md py-1 px-3 text-[#CCFDCE]">
          Run
        </button>
      </div>
      <div className="flex w-1/3 justify-end gap-6">
        <Button name="+Invite" />
        <Button name="+Fork" />
        <Button name="+Share" />
      </div>
    </header>
  );
};

export default index;
