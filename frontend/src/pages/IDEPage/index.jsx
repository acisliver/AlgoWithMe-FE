
import Chatroom from "./components/chatroom";
import Console from "./components/console";
import Editor from "./components/editor";
import FileExplorer from "./components/file_explorer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

const index = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-row h-full">
        <div className="flex flex-row w-1/4">
          <Sidebar />
          <FileExplorer />
        </div>
        <div className="flex flex-col w-3/4">
          <Editor />
          <Console />
        </div>
      </div>
      <Chatroom />
    </div>
  );
};

export default index;

