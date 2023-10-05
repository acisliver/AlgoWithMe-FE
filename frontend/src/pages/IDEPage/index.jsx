import Chatroom from "./components/chatroom";
import Console from "./components/console";
import Editor from "./components/editor";
import FileExplorer from "./components/file_explorer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Modal from "./components/modal";
import React, { useState } from "react";
import * as projectService from '../../service/projectService'

const index = () => {
  const [onModalClick, setOnModalClick] = useState(true);
  const [modal,setModal] =React.useState(false);
  const [projectStructure, setProjectStructure] = React.useState([]);


  const projectBtnHandler = (isOn) => {
    setOnModalClick(isOn);
  };

  const createModal= ()=> {
    setModal((prev)=>!prev);
  }
  const handlePjtClick= async(projectId)=>{
    try {
      const response = await projectService.getProjectStructure(projectId);
      if(response.success){
        setProjectStructure(response.data)
        projectBtnHandler(false)
      }else{
       console.error(response.error);
      }  
    } catch (error) {
      console.error(error)
    } 
 

}


  return (
    <div>
    {onModalClick && <Modal 
                        onProjClick={projectBtnHandler} 
                        modal ={modal} 
                        setModal={setModal} 
                        createModal={createModal}
                        handlePjtClick={handlePjtClick}
                        />}
      <div className="flex flex-col h-screen relative">
        <Header onProjClick={projectBtnHandler} />
        <div className="flex flex-row h-full">
          <div className="flex flex-row w-1/4">
            <Sidebar createModal={createModal} projectBtnHandler={projectBtnHandler} projectStructure={projectStructure}/>
            <FileExplorer />
          </div>
          <div className="flex flex-col w-3/4 h-full">
            <Editor />
            <Console />
          </div>
        </div>
        <Chatroom className="absolute bottom-0 right-0 z-50" />
      </div>
    </div>
  );
};

export default index;