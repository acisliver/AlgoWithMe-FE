import { useState } from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';  
import './index.css';
import { FaHtml5 } from 'react-icons/fa';
import {BiLogoJavascript} from 'react-icons/bi';
import {DiCss3} from 'react-icons/di';


export default function Explorer({ selectedTab }) {
  const [searchValue, setSearchValue] = useState("");
  const [showInput,setShowInput] = useState(false);
  const [value,setValue] =useState("");
  const [tree,setTree] = useState([ 
    {
      key: "0-1",
      title: "root",
      type : 'folder',
      children: []
    },
    {key: '0-2',
      title: 'Node1', type : 'folder',
      children: [
        { key: '0-2-1', title: 'index.html', type: 'html' }
      ]
    },
      ]);
  const [selectedFolderKey, setSelectedFolderKey] = useState(null);


  const searchChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

const toggleinput =() =>{
  setShowInput(prev => !prev)
}

  const determineFileType = (fileName) => {
    if (fileName.endsWith('.js')) return 'js';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.html')) return 'html';
    return 'unknown'; 
  }

  const switcherIcon = (obj) => {
    if(obj.type === "folder"){
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
    }
    if(obj.isLeaf){
      switch(obj.type){
        case "html" :
          return<FaHtml5 size='16' color='#AD5700'/>
        case 'js' : 
          return<BiLogoJavascript size='16' color='#967D00' />
        case 'css' :
          return<DiCss3 size='16' color='#0079F2' />
        default : 
        return  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F5F9FC" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
      
      }
    }
    else if (obj.expanded) {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
  </svg>
       } else { 
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
    }
  };
  
  const onFolderClick = (key) => {
    setSelectedFolderKey(key);
      console.log("key", key);
  }

  const createFile = (fileName) => {
    const fileType = determineFileType(fileName);
    const newFile = {
      key: selectedFolderKey ? `${selectedFolderKey}-${Date.now()}` : `${Date.now()}`,
      title: fileName,
      type: fileType,
    };

    console.log("Creating file:", newFile); 
    if (!selectedFolderKey) {
      setTree(prevData => [...prevData, newFile]);
  } else {
    setTree(prevData => 
      prevData.map(node => 
        node.key === selectedFolderKey ? 
          { ...node, children: [...node.children, newFile] } : 
          node
      )
    );
      }
      toggleinput();
}
  
// const createFolder = (folderName) => {
//   const newFolder = {
//     key: `${selectedFolderKey}-${Date.now()}`,
//     title: folderName,
//     type: 'folder',
//     children: []
//   };

//   console.log("Creating folder:", newFolder); 


//   if (!selectedFolderKey || !tree.find(node => node.key === selectedFolderKey)) {
//     setTree(prevData => [...prevData, newFolder]);
//   } else {
//     setTree(prevData => 
//       prevData.map(node => 
//         node.key === selectedFolderKey ? 
//           { ...node, children: [...node.children, newFolder] } : 
//           node
//       )
//     );
//   }
// }


  const treeSubmit =(e) =>{
    console.log("treeSubmit called");
    e.preventDefault();
      createFile(value)
    setValue("")
  }
  

  if(selectedTab === 'tabFiles'){
  return (
    <div style={{maxWidth : '180px'}}>
      <form className=' bg-[#0E1525]'>
        <input className='bg-[#1D2332] hover:bg-[#2B3245] h-8 rounded-md  my-0.5 placeholder:pl-2 text-white' placeholder='Search' value={searchValue} onChange={searchChange} />
      </form>
      <div className='bg-[#0E1525] text-white flex justify-between font-medium pl-1 pr-2 pt-1'>
        Files
        <div className='flex '>
          <button className='hover:bg-[#1C2333] rounded-lg' onClick={toggleinput} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-1 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
</button>
<button className='hover:bg-[#1C2333] rounded-lg' onClick={toggleinput}  >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>
</button>
</div>
      </div>
      
      <div  className='bg-[#0E1525] text-white text-sm leading-3 pl-2 '> 
      <Tree
      // defaultExpandedKeys={['0-0']}  
      treeData={tree}
      showIcon={false}
      defaultExpandAll={false}
      switcherIcon={switcherIcon}
      draggable ={true}
      onSelect={(selectedKeys) => {
      onFolderClick(selectedKeys[0]);
      }}
        />

      {showInput && (
          <form className=' bg-[#0E1525]' onSubmit={treeSubmit}>
            <input 
              className='bg-[#1D2332] hover:bg-[#2B3245] h-8 rounded-md  my-0.5 placeholder:pl-2 text-white' 
              placeholder='Filename' 
              value={value} 
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        )}
    </div>
    </div>
  );
  
} else if (selectedTab === 'tabSearch') {
  // tabSearch'를 클릭
  return (
    <div>
      {/* Search 관련 내용 */}
    </div>
  );
}
}
