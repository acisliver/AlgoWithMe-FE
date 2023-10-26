import React, { useState } from 'react';
import ProblemPanel from '../../UI/molecules/ProblemPanel';
import Editor from '../../UI/molecules/Editor';
import OutputPanel from '../../UI/molecules/OutputPanel';
import constantProblem from './constant';

const index = () => {
  const [problem, setProblem] = useState(constantProblem);

  return (
    <main className="flex flex-row bg-[#E7E7E7] h-screen">
      <ProblemPanel
        number={problem.number}
        title={problem.title}
        difficulty={problem.difficulty}
        status={problem.status}
        acceptance={problem.acceptance}
        description={problem.description}
        tags={problem.tags}
      />
      <div className="grow">
        <Editor
          templates={problem.templates}
          availableLanguage={problem.availableLanguage}
        />
        <OutputPanel testcases={problem.testcases} />
      </div>
    </main>
  );
};

export default index;
