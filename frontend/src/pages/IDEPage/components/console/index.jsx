import React, { useState } from "react";
import "./index.css";
import Tab from "./components/Tab";
import CloseButton from "./components/CloseButton";

const index = () => {
  const [activeTab, setActiveTab] = useState("terminal");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      id="inner_layout_bottom"
      className="bg-[rgb(14,21,37)] overflow-hidden"
    >
      <ul id="south_tab" className="nav nav_tabs " style={{ display: "flex" }}>
        <Tab
          isActive={activeTab === "terminal"}
          label="터미널"
          onClick={() => handleTabClick("terminal")}
        />
        <Tab
          isActive={activeTab === "문제"}
          label="문제"
          onClick={() => handleTabClick("문제")}
        />
        <CloseButton />
      </ul>
    </div>
  );
};

export default index;
