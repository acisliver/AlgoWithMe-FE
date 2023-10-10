import React, { useState } from "react";
import Button from "./components/Button";
import ExeButton from "./components/ExeButton";
import ProjectTitleButton from "./components/ProjectTitleButton";
import {runFile} from "../../../../service/FileService.js";

const index = (props) => {
  const [running, setRunning] = useState(false);


    const onExecute = async () => {
    setRunning((prev) => !prev);

        try {
            const result = await runFile(props.selectedProject.id, props.selectedFileId);
            console.log("File run successfully:", result.data);
            props.setRunResult(prev => [...prev, "result:" + result.data]);
        } catch (error) {
            console.error("Failed to run file:", error.message);
        }


    setRunning((prev) => !prev);
    };

  return (
    <header className="flex justify-between py-2 px-4 bg-[#0F1524]">
      <div className="flex w-1/3">
      </div>
      <div className="flex w-1/5 justify-center">
        <ProjectTitleButton onProjectClick={props.onProjClick}/>
      </div>
      <div className="flex w-1/3 justify-end gap-6">
        <Button name="Invite" onInviteClick={props.onInviteClick}/>
        <ExeButton running={running} toggleRunning={onExecute} />
      </div>
    </header>
  );
};

export default index;
