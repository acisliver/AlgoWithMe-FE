import React from "react";
import Chatroom from "./components/chatroom";
import Console from "./components/console";
import Editor from "./components/editor";
import FileExplorer from "./components/file_explorer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

const index = () => {
  return (<div>
    <Header />
    <Sidebar />
    <FileExplorer />
    <Editor />
    <Console />
    <Chatroom />
  </div>)
};

export default index;
