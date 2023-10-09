import React, {useState, useRef, useEffect} from "react";
import Tab from "./components/Tab";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { python } from '@codemirror/lang-python';
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import "./index.css";
import axios from "axios";

//탭
const Index = ({editorHeight, editorWidth, selectedProject, selectedFileId}) => {
  const [activeTab, setActiveTab] = useState("Main.java");
  const [tabs, setTabs] = useState([
    {title: "Main.java", content: "console.log('Hello World!'); 111 abcd"},
    {title: "index.js", content: "console.log('Hello World!'); 222 abcd"},
    {title: "index.py", content: "console.log('Hello World!'); 333 abcd"},
    {title: "index.html", content: "console.log('Hello World!'); 444 abcd"},
    {title: "index.css", content: "console.log('Hello World!'); 555 abcd"},

  ]);

  useEffect(() => {
    const fetchFile = async () => {
      console.log("projectId", selectedProject.id)
      console.log("fileId", selectedFileId)
      const response = await axios.get(
          `http://50.19.246.89:8080/api/v1/projects/${selectedProject.id}/files/${selectedFileId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
      )
      console.log(response.data);
      const title = `${response.data.fileName}.${response.data.ext}`;
      setActiveTab(title);
      setTabs([...tabs, { title: title, content: response.data.content }]);
    }
    fetchFile()
  }, [selectedProject, selectedFileId]);

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    const newTabContent = tabs.find(tab => tab.title === tabTitle)?.content || "";
    setValue(newTabContent);
  };

  //탭 유형에 따른 에디터 설정
  const getExtensionForTab = (tabTitle) => {
    if (tabTitle.endsWith(".java")) {
      return java();
    } else if (tabTitle.endsWith(".html")) {
      return html();
    } else if (tabTitle.endsWith(".jsx") || tabTitle.endsWith(".js")) {
      return javascript({ jsx: true });
    } else if (tabTitle.endsWith(".css")) {
      return css();
    } else if (tabTitle.endsWith(".py")) {
      return python();
    }
  };
  const activeExtension = getExtensionForTab(activeTab);
  

  //닫기 버튼
  const handleCloseTab = (tabTitleToClose) => {
    setTabs(tabs.filter((tab) => tab.title !== tabTitleToClose));
    if (activeTab === tabTitleToClose && tabs.length > 0) {
      setActiveTab(tabs[0].title);
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

  // CodeMirror 적용
  const activeTabContent = tabs.find(tab => tab.title === activeTab)?.content || "";
  const [value, setValue] = React.useState(activeTabContent);
  
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setTabs(tabs.map(tab => {
      if (tab.title === activeTab) {
        return { ...tab, content: val };
      }
      return tab;
    }));
    setValue(val);
  }, [activeTab, tabs]);

  const cmHeight = `${parseInt(editorHeight, 10) - 4}vh`;

  return (
    <div id="inner_layout_top" className="bg-[#0E1525]" style={{height: editorHeight, width: editorWidth}}>
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
            isActive={activeTab === tab.title}
            label={tab.title}
            onClick={() => handleTabClick(tab.title)}
            onClose={() => handleCloseTab(tab.title)}
          />
        ))}
      </ul>
      <div className="text-gray-400">
        <CodeMirror
          key={activeTab}
          value={value}
          height={cmHeight}
          width={editorWidth}
          extensions={[activeExtension]}
          onChange={onChange}
          theme={tokyoNight} // 테마 
          style={{
            overflow: 'auto',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </div>
  );
};

export default Index;
