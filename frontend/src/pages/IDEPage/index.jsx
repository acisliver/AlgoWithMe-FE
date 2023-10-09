import Chatroom from "./components/chatroom";
import Console from "./components/console";
import Editor from "./components/editor";
import FileExplorer from "./components/file_explorer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Modal from "./components/modal";
import Invite from "./components/invite";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/axiosInstance";
import * as projectService from '../../service/projectService'

const index = () => {
  const [onModalClick, setOnModalClick] = useState(true);
  const [modal, setModal] = React.useState(false);
  const [projectStructure, setProjectStructure] = React.useState({data: []});
  const [onInviteTap, setOnInviteTap] = useState(false);
  const [user, setUser] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState("");
  const [editorHeight, setEditorHeight] = useState("60vh");
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [isTabFilesVisible, setIsTabFilesVisible] = useState(false);
  const [editorWidth, setEditorWidth] = useState("100%");
  const [projects,setProjects] =React.useState([])
  const [selectedProject, setSelectedProject] =useState({})
  const [isEditing, setIsEditing] = useState(false);
  const [createId,setCreateId] = useState()

  const inviteClickHandler = () => {
    setOnInviteTap((prev) => {
      return !prev;
    });
  };


  const projectBtnHandler = (isOn) => {
    setOnModalClick(isOn);
  };
  useEffect(() => {
    console.log('Projects:', projects);
  }, [projects]);

  const handlePjtClick= async(projectId)=>{
    try {
      const response = await projectService.getProjectStructure(projectId);
      if(response.success){
        const selectedProject = projects.find(p => p.id === projectId);
        setProjectStructure(response.data)
        projectBtnHandler(false)
        setSelectedProject(selectedProject);
        setUserDisplayName(selectedProject.me);
      }

      }else{
       console.error(response.error);
      }  
    } catch (error) {
      console.error(error)
    }
}



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("projects");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchUserData();
  }, []);


  useEffect(() => {
    if (isTabFilesVisible) {
      setEditorWidth("100%");
    } else {
      setEditorWidth("100%");
    }
  }, [isTabFilesVisible]);

  const toggleConsoleVisibility = () => {
    setIsConsoleVisible(prev => !prev);
    setEditorHeight(isConsoleVisible ? "96vh" : "60vh");
  };


  const handleCreateButtonClick = () => {
    setIsEditing(false);
    setModal(true); //
};

  const handleInfoButtonClick = (id) => {
    projectBtnHandler(true)
    setIsEditing(true);
    setModal(true);
    if(!selectedProject){
      const selectedProject = projects.find(p => p.id === id);
      setSelectedProject(selectedProject);
    }
};

  return (
    <div>
      {onModalClick && (
        <Modal
          onProjClick={projectBtnHandler}
          modal={modal}
          setModal={setModal}
          handlePjtClick={handlePjtClick}
          user={user} // 사용자 데이터를 prop으로 전달
          projects={projects}
          setProjects={setProjects}
          isEditing={isEditing}
          selectedProject={selectedProject}
          handleCreateButtonClick={handleCreateButtonClick}
          setCreateId={setCreateId}
        />
      )}


      <div className="flex flex-col h-screen relative">
        <Header onProjClick={projectBtnHandler} onInviteClick={inviteClickHandler}/>
        <div className="absolute top-[60px] right-[110px] z-[100]">
          {onInviteTap && <Invite />}
        </div>

        <div className="flex flex-row w-full h-full">
          <div className="flex flex-row">
            <Sidebar
              handleInfoButtonClick={handleInfoButtonClick}
              projectStructure={projectStructure && projectStructure.data ? projectStructure.data : {}}
              toggleConsoleVisibility={toggleConsoleVisibility}
              setTabFilesVisible={setIsTabFilesVisible}
              isConsoleVisible={isConsoleVisible}
              selectedProject={selectedProject}
              createId={createId}
            />
            <FileExplorer />
          </div>
          <div className="flex flex-col w-full h-full">
            <Editor editorHeight={editorHeight} editorWidth={editorWidth} />
            <Console isVisible={isConsoleVisible} toggleConsoleVisibility={toggleConsoleVisibility} />
          </div>
        </div>
        <Chatroom className="absolute bottom-0 right-0 z-50" userName={userDisplayName}/>

      </div>
    </div>
  );
};

export default index;
