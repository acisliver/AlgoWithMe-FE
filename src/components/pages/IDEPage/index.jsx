import React from 'react';
import Problems from '../../UI/molecules/Problems';
import Editor from '../../UI/molecules/Editor';

const index = () => (
  <div className="flex flex-row bg-[#E7E7E7] h-screen">
    <Problems />
    <div>
      <Editor />
    </div>
  </div>
);

export default index;
