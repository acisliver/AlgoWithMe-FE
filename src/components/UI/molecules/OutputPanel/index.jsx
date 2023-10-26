import React from 'react';
import Button from '../../atoms/Input/Button';

const index = () => (
  <div className="p-2 m-4 bg-white rounded-xl ">
    <div>결과표시</div>
    <div className="flex flex-row justify-between items-center">
      <h2>Console ▲</h2>
      <div className="flex flex-row justify-end gap-4">
        <Button>실행</Button>
        <Button>제출</Button>
      </div>
    </div>
  </div>
);

export default index;
