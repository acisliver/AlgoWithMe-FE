import React, {useState, useRef, useEffect, useCallback} from "react";
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
import { debounce } from 'lodash';

//탭
const Index = ({editorHeight, editorWidth, selectedProject, selectedFileId}) => {
    const [tabs, setTabs] = useState([
    {title: "네카라쿠배.java", content: "메인 화면입니다! 원하는 파일을 선택하여주세요."},
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const [code, setCode] = useState(""); 

  const saveCode = useCallback(async (codeToSave) => {
    if (!codeToSave || !selectedFileId) {
      console.error("Code to save or fileId is invalid. Skipping the save request.");
      return;
  }
  
    const payload = {
        name: activeTab,
        storageId: "",
        content: codeToSave
    };
    try {
        await axios.put(`http://50.19.246.89:8080/api/v1/projects/${selectedProject.id}/files/${selectedFileId}`,
        payload, 
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
    } catch (error) {
        console.error("Error saving code:", error);
        if (error.response) {
            console.error('Server response:', error.response.data);
        }
    }
});

const debouncedSaveCode = useCallback(debounce(saveCode, 2000), [saveCode]);


  useEffect(() => {
    const fetchFile = async () => {
      console.log("projectId", selectedProject.id)
      console.log("fileId", selectedFileId)
      console.log('Stored token:', localStorage.getItem("token"));

      if (selectedFileId == null) {
        console.error("fileId is null or undefined. Skipping the fetch request.");
        return;
      }
  
      try {
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
        setCode(response.data.content);
      } catch (error) {
        console.error("Error fetching file:", error);
        if (error.response) {
            console.error('Server response:', error.response.data);
        }
      }
    }
    fetchFile()
  }, [selectedProject, selectedFileId]);

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
    setCode(newTabContent);
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
          key={selectedFileId}
          value={code}
          height={cmHeight}
          width={editorWidth}
          extensions={[activeExtension]}
          onChange={(editor, data) => {
            console.log("Change data: ", data);
            
            if (editor && data && data.state && data.state.doc) {
                try {
                    const val = data.state.doc.text.join('\n');
                    console.log("Code to Save: ", val);
                    setCode(val);
                    debouncedSaveCode(val);
                } catch (error) {
                    console.error("Error retrieving/saving code: ", error);
                }
            } else {
                console.error("Editor instance or data is not available");
            }
        }}
        
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