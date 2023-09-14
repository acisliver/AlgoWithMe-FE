import React, { useState } from "react";
import Button from "./components/Button";
import ExeButton from "./components/ExeButton";
import ProfileBadge from "./components/ProfileBadge";

const index = () => {
  const [running, setRunning] = useState(false);

  return (
    <header className="flex justify-between py-2 px-4 bg-[#0F1524]">
      <div className="flex w-1/3">
        <ProfileBadge />
      </div>
      <div className="flex w-1/5 justify-center">

      </div>
      <div className="flex w-1/3 justify-end gap-6">
        <Button name="+Invite" />
        <Button name="+Fork" />
        <Button name="+Share" />
        <ExeButton
          running={running}
          toggleRunning={() => setRunning(!running)}
        />
      </div>
    </header>
  );
};

export default index;
