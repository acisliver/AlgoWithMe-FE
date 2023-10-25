import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

function Index() {
  const [editorState, setEditorState] = useState({
    code: '',
    language: 'javascript',
  });

  return (
    <div className="w-[900px] h-[600px] p-4 m-4 bg-white rounded-xl ">
      <div>{editorState.language}</div>
      <Editor
        width="100%"
        height="90%"
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
  );
}

export default Index;
