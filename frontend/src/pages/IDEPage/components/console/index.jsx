import React, { useState } from "react";
import "./index.css";
import CloseIcon from "@mui/icons-material/Close";

const index = () => {
  const [activeTab, setActiveTab] = useState("terminal");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      id="goorm_inner_layout_bottom"
      className="bg-[#0E1525] overflow-hidden"
      style={{
        display: "block",
        justifyContent: "space-between",
        position: "absolute",
        margin: "0px",
        inset: "auto 0px 0px 20vw",
        width: "auto",
        zIndex: 10,
        height: "382px",
        visibility: "visible",
      }}
    >
      <ul id="south_tab" className="nav nav_tabs " style={{ display: "flex" }}>
        <li>
        <a
            className={`nav_link ${activeTab === 'terminal' ? 'active' : ''}`}
            href="#terminal"
            id="gLayoutTab_Terminal"
            onClick={() => handleTabClick('terminal')}
          >
            <span className="tab_title text-sm font-bold">터미널</span>
          </a>
        </li>
        <li>
        <a
            className={`nav_link ${activeTab === '문제' ? 'active' : ''}`}
            href="#문제"
            id="gLayoutTab_problem"
            onClick={() => handleTabClick('문제')}
          >
            <span className="tab_title text-sm font-bold">문제</span>
          </a>
        </li>
        <button
          type="button"
          id="south_tab_close_btn"
          className="btn"
          title=""
          data-container="body"
        >
          <CloseIcon />
        </button>
      </ul>
    </div>
  );
};

export default index;
