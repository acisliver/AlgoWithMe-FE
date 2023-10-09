import { useEffect, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import "./index.css";
import { FaHtml5 } from "react-icons/fa";
import { BiLogoJavascript, BiLogoPython, BiLogoJava } from "react-icons/bi";
import { DiCss3 } from "react-icons/di";
import Contextmenu from "./Contextmenu";
import { useContextMenu } from "react-contexify";
import TabSettings from "./TabSettings";
import Form from "./Form";
import * as fileService from "../../../../service/fileService";
import { v4 as uuidv4 } from 'uuid';



export default function Explorer({ selectedTab,projectStructure,createId,handleInfoButtonClick,createModal,projectBtnHandler,selectedProject,setSelectedFileId,selectedFileId }) {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");
  const [tree, setTree] = useState(projectStructure);
  const [selectedFolderKey, setSelectedFolderKey] = useState(null);
  const [creatingItemType, setCreatingItemType] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [lastKey, setLastKey] = useState(50);
  const [editingValue, setEditingValue] = useState("");
  const [editingType, setEditingType] = useState(null);
  const [editing, setEditing] = useState(false);
  const [selectedPath, setSelectedPath] = useState("");

  useEffect(() => {
    if (projectStructure) {
      setTree(projectStructure);
    }
  }, [projectStructure]);

  useEffect(() => {
    console.log('selectedFileId changed:', selectedFileId);
}, [selectedFileId]);

  const toggleinput = () => {
    setShowInput((prev) => !prev);
  };

  const determineFileType = (fileName) => {
    if (fileName.endsWith('.js')) return 'js';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.java')) return 'java';
    if (fileName.endsWith('.py')) return 'py';
    return 'unknown';
  }

  const switcherIcon = (obj) => {
    if (obj.type === "folder") {
      if (obj.expanded) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              />
            </svg>
        );
      } else {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
        );
      }
    } else if (obj.isLeaf) {
      switch (obj.type) {
        case "html" :
          return <FaHtml5 size='16' color='#AD5700'/>
        case 'js' :
          return <BiLogoJavascript size='16' color='#967D00'/>
        case 'css' :
          return <DiCss3 size='16' color='#0079F2'/>
        case 'java' :
          return <BiLogoJava size='18' color='#0078F1'/>
        case 'py' :
          return <BiLogoPython size='18' color='#0093B0'/>
        default :
          return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                      stroke="#F5F9FC" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
          </svg>
      }
    }
  };

  const onFolderClick = (key) => {
    console.log(selectedFolderKey);
    setSelectedFolderKey(key);
  }


  const createFile = async (fileName) => {
    // const newFilePath = findPathByKey(tree, selectedFolderKey) + `/${fileName}`;
    const newFilePath = selectedPath + `/${fileName}`;
    const projectId = selectedProject.id
    try {
      const response = await fileService.createFile(projectId, newFilePath)
      if (response.success) {
        const fileType = determineFileType(fileName);
        const newFile = {
          key: `${lastKey}`,
          title: fileName,
          type: fileType
        };
        if (!selectedFolderKey) {
          setTree(prevData => [...prevData, newFile]);
        } else {
          setTree(prevData => addNodeRecursive(prevData, selectedFolderKey, newFile));
        }
        toggleinput();
        setLastKey(prev => prev + 1)
      } else {
        console.error('Error creating file:', response.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


//   function findPathByKey(tree, targetKey) {
//     let path = [];

//     function traverse(node, currentPath) {
//       if (node.key === targetKey) {
//         path = currentPath.concat(node.title);
//         return true; // 종료 조건
//       }

//       if (!node.children) {
//         return false; // node.children이 null 또는 undefined인 경우 반환
//       }

//       for (let child of node.children) {
//         if (traverse(child, currentPath.concat(node.title))) {
//           return true; // 경로가 발견되면 재귀 탐색 종료
//         }
//       }
//       return false; // 이 노드에서는 경로가 발견되지 않았음을 반환
//     }

//     for (let rootNode of tree) {
//       if (traverse(rootNode, [])) break; // targetKey와 일치하는 노드를 찾으면 반복 종료
//     }
    
//     return path.join('/');
// }

  const createFolder = (folderName) => {
    const newFolder = {
      id: uuidv4(),
      key: lastKey,
      path:selectedPath+ `/${folderName}`,
      title: folderName,
      type: 'folder',
      children: []
    };
    console.log("Creating folder:", newFolder);
    if (!selectedFolderKey) {
      setTree(prevData => [...prevData, newFolder]);
    } else {
      setTree(prevData =>
          addNodeRecursive(prevData, selectedFolderKey, newFolder));
    }
    toggleinput();
    setLastKey(prev => prev + 1)
  }


  const addNodeRecursive = (tree, targetKey, newNode) => {
    return tree.map((node) => {
      if (node.key === targetKey) {
        if (!node.children) {
          return node;
        }
        return {
          ...node,
          children: [...node.children, newNode],
        };
      }
      if (node.children) {
        return {
          ...node,
          children: addNodeRecursive(node.children, targetKey, newNode),
        };
      }
      return node;
    });
  };


  const treeSubmit = (e) => {
    e.preventDefault();
    if (creatingItemType === "file") {
      createFile(value);
    } else if (creatingItemType === "folder") {
      createFolder(value);
    }
    setValue("");
  };

  const menu_id = "contextmenu1";
  const {show} = useContextMenu({
    id: menu_id,
  });

  const handleFileClick = (selectedKeys, info) => {
    onFolderClick(selectedKeys[0]);
    setSelectedPath(info.node.path);
    setSelectedFileId(info.node.id);
  };

  const handlecontextMenu = ({event, node}) => {
    show({id: "menu-id", event});
    setEditingValue(node.title);
    setEditingType(node.type);
    setEditingKey(node.key);
    setSelectedFileId(node.id);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTree((prevTree) =>
        updateNodeRecursive(prevTree, editingKey, editingValue, editingType)
    );
    setEditingKey(null);
    setEditingValue("");
    setEditing(false);
  };

  const updateNodeRecursive = (tree, targetKey, newValue, newType) => {
    const fileType = determineFileType(newValue);
    return tree.map((node) => {
      if (node.key === targetKey) {
        return {
          ...node,
          title: newValue,
          type: newType === "folder" ? "folder" : fileType,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateNodeRecursive(node.children, targetKey, newValue),
        };
      }
      return node;
    });
  };

  const renderTreeNode = (node) => {
    if (node.key === editingKey && editing) {
      return (
          <form onSubmit={handleEditSubmit}>
            <input
                className=" bg-[#0E1525] text-white"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
            />
          </form>
      );
    }
    return node.title;
  };

  // const handleDelete = () => {
  //   return setTree(prevTree => deleteNodeRecursive(prevTree, editingKey));
  // }


  const handleDelete = async () => {
    if (!selectedProject || !selectedProject.id) {
      console.error("selectedProject is not defined or does not have an id");
      return;
    }
    
    const projectId = selectedProject.id;
    console.log("id",projectId);
    try {
      const response = await fileService.deleteFile(projectId, selectedFileId);
      if (response.success) {
        setTree(prevTree => deleteNodeRecursive(prevTree, editingKey));
      } else {
        console.error("Error deleting file from server:", response.error);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const deleteNodeRecursive = (tree, targetKey) => {
    let updatedTree = tree.filter((node) => node.key !== targetKey);

    updatedTree = updatedTree.map((node) => {
      if (node.children) {
        return {
          ...node,
          children: deleteNodeRecursive(node.children, targetKey),
        };
      }
      return node;
    });
    return updatedTree;
  };

  if(selectedTab === 'tabFiles'){
    return (
      <div style={{width : '440px', border: '0.5px solid black'}} className='bg-[#0E1525]  text-white '>
        <div className=' flex justify-between font-medium pl-1 pr-2 pt-1'>
          Files
          <div className='flex '>
            <button className='hover:bg-[#1C2333] rounded-lg' onClick={()=>{toggleinput();setCreatingItemType('file');}} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-1 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
      </button>
      <button className='hover:bg-[#1C2333] rounded-lg'onClick={() => {toggleinput();setCreatingItemType('folder');}}  >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
      </button>
      </div>
        </div>
        
        <div  className='bg-[#0E1525] text-white text-sm leading-3 pl-2 '> 
        <Tree
          treeData={tree}
          showIcon={false}
          defaultExpandAll={true}
          switcherIcon={switcherIcon}
          draggable ={true}
          onSelect={(selectedKeys, info) => {
          onFolderClick(selectedKeys[0]);
          setSelectedPath(info.node.path)
          setSelectedFileId(info.node.id)
         }}
          onRightClick={handlecontextMenu}
          titleRender={renderTreeNode}
        />
        <Contextmenu 
          setEditing={setEditing} 
          handleDelete={handleDelete}
        />
        <Form 
          showInput={showInput} 
          value={value} 
          setValue={setValue} 
          treeSubmit={treeSubmit}
        />
        </div>
      </div>
    );
    
  } else if (selectedTab === 'tabSetting') {
    return (
     <TabSettings
      handleInfoButtonClick={handleInfoButtonClick}
      createId={createId} />
    );
  }
  }