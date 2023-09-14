import React, { useState, useEffect } from "react";

const ProfileBadge = () => {
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const generateRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    setBackgroundColor(generateRandomColor());
  }, []);

  return (
    <div className="w-10 h-10 text-white flex items-center justify-center rounded-full" 
    style={{ backgroundColor }}>
      G
    </div>
  );
};

export default ProfileBadge;
