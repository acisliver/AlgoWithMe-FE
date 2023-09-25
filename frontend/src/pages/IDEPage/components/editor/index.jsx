import React, { useState, useRef } from "react";
import Tab from "./components/Tab";
import "./index.css";

//탭
const Index = () => {
  const [activeTab, setActiveTab] = useState("Main.java");
  const [tabs, setTabs] = useState([
    "Main.java",
    "index.jsx",
    "index.css",
    "index1.jsx",
    "index2.jsx",
    "index3.jsx",
    "index4.jsx",
    "index5.jsx",
    "index6.jsx",
    "index7.jsx",
    "index8.jsx",
    "index9.jsx",
    "index0.jsx",
  ]);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  //닫기 버튼
  const handleCloseTab = (tabToClose) => {
    setTabs(tabs.filter((tab) => tab !== tabToClose));
    if (activeTab === tabToClose) {
      setActiveTab(tabs[0]);
    }
  };

   //스크롤
  const tabsRef = useRef(null);
  const handleWheel = (e) => {
    e.stopPropagation();
    const container = tabsRef.current;
    const containerScrollPosition = container.scrollLeft;
    container.scrollLeft = containerScrollPosition + e.deltaY;
  };

  //스크롤 숨김, 스크롤 동시에 작동 안 하게
  const handleMouseEnter = () => {
    document.body.classList.add("no-scroll");
  };
  const handleMouseLeave = () => {
    document.body.classList.remove("no-scroll");
  };

  return (
    <div id="inner_layout_top" className="bg-[#0E1525] overflow-hidden">
      <ul
        ref={tabsRef}
        onWheel={handleWheel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id="north_tab"
        className="nav nav_tabs"
        style={{ display: "flex" }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            isActive={activeTab === tab}
            label={tab}
            onClick={() => handleTabClick(tab)}
            onClose={() => handleCloseTab(tab)}
          />
        ))}
      </ul>
      <div className="text-white">{activeTab} 내용 </div>
    </div>
  );
};

export default Index;
