import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import DropdownMenu from '../../atoms/Input/Dropdown';

function Index({ templates, availableLanguage }) {
  const [editorState, setEditorState] = useState({
    code: '',
    language: 'javascript',
  });

  const handleSelectItem = (item) => {
    setEditorState((prev) => ({ ...prev, language: item }));
  };

  return (
    <div className="flex flex-col h-[600px] p-2 m-4 bg-white rounded-xl ">
      <div className="mx-4 my-2">
        <DropdownMenu
          title={editorState.language}
          list={availableLanguage}
          handleSelectItem={handleSelectItem}
        />
      </div>
      <div className="mx-4 my-2 grow">
        <Editor
          width="100%"
          height="100%"
          language={editorState.language}
          value={editorState.code}
          onChange={(value) =>
            setEditorState((prev) => ({ ...prev, code: value }))
          }
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
            },
          }}
        />
      </div>
    </div>
  );
}

export default Index;
