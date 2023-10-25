import React, { useState } from 'react';
import constant from './constant';

const index = () => {
  const [problem, setProblem] = useState(constant);

  return (
    <div className="w-[600px] border">
      <div className="m-4">
        <h2>{`${problem.number}. ${problem.title}`}</h2>
      </div>
      <div className="flex flex-row gap-4 m-4">
        <p>{problem.difficulty}</p>
        <p>{problem.status}</p>
        <p>{`정답률: ${problem.acceptance}`}</p>
      </div>
      <div className="flex flex-col gap-4 m-4">
        <h3>설명</h3>
        <p>{problem.description}</p>
      </div>
      <div className="flex flex-col gap-4 m-4">
        <h3>입력</h3>
        <p>placeholder</p>
      </div>
      <div className="flex flex-col gap-4 m-4">
        <h3>출력</h3>
        <p>placeholder</p>
      </div>
    </div>
  );
};

export default index;
