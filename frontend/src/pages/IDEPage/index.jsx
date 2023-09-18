
import Chatroom from "./components/chatroom";
import Console from "./components/console";
import Editor from "./components/editor";
import FileExplorer from "./components/file_explorer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

const index = () => {
  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      <div className="flex flex-row h-full">
        <div className="flex flex-row w-1/4">
          <Sidebar />
          <FileExplorer />
        </div>
        <div className="flex flex-col w-3/4">
          <Editor />
        </div>
        <div className="">
          <Console />
        </div>
      </div>
      <Chatroom className="absolute bottom-0 right-0 z-50"/>
    </div>
  );
};

export default index;
