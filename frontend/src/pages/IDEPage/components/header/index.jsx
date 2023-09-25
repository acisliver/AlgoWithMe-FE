import React, { useState } from "react";
import Button from "./components/Button";
import ExeButton from "./components/ExeButton";
import ProfileBadge from "./components/ProfileBadge";

const index = () => {
  const [running, setRunning] = useState(false);

  const onExecute = async () => {
    setRunning((prev) => !prev);

    const id = 1;
    const response = await fetch(`http://localhost:8080/v1/projects/${id}/run`, {
      method: 'GET',  // 예: 'POST', 'PUT', 'DELETE' 등
    });

    if (!response.ok) {
      console.error("Failed to execute", response.statusText);
      return;
    }

    const result = await response.json();
    console.log(result);
    
    setRunning((prev) => !prev);
  }

  return (
    <header className="flex justify-between py-2 px-4 bg-[#0F1524]">
      <div className="flex w-1/3">
        <ProfileBadge />
      </div>
      <div className="flex w-1/5 justify-center">

      </div>
      <div className="flex w-1/3 justify-end gap-6">
        <Button name="Invite" />
        <ExeButton
          running={running}
          toggleRunning={onExecute}
        />
      </div>
    </header>
  );
};

export default index;
