import React, { useState } from "react";
import Button from "./components/Button";
import ExeButton from "./components/ExeButton";
import ProjectTitleButton from "./components/ProjectTitleButton";

const index = (props) => {
  const [running, setRunning] = useState(false);

  const onExecute = async () => {
    setRunning((prev) => !prev);

    const id = 1;
    const response = await fetch(
      `http://localhost:8080/v1/projects/${id}/run`,
      {
        method: "GET", // 예: 'POST', 'PUT', 'DELETE' 등
      }
    );

    if (!response.ok) {
      console.error("Failed to execute", response.statusText);
      return;
    }

    const result = await response.json();
    console.log(result);

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
