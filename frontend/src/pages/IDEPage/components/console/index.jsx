import React, { useState } from "react";
import "./index.css";
import Tab from "./components/Tab";
import CloseButton from "./components/CloseButton";

const Index = ({ isVisible, toggleConsoleVisibility, runResult }) => {
  const [activeTab, setActiveTab] = useState("terminal");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!isVisible) {
    return null; // 창이 숨겨진 경우 아무것도 렌더링하지 않음
  }

  return (
    isVisible && (
      <div
        id="inner_layout_bottom"
        className="bg-[rgb(14,21,37)] overflow-hidden"
      >
        <ul
          id="south_tab"
          className="flex nav_tabs border-b-0 text-center pl-0 list-none"
        >
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
          <CloseButton onClose={toggleConsoleVisibility} />
        </ul>
        <div>
          <ul>
            {runResult.map(result => <li className="text-white">{result}</li>)}
          </ul>
        </div>
      </div>
    )
  );
};

export default Index;
