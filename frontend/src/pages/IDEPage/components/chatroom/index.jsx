import React, { useState } from "react";

const index = (props) => {
  const [openChatroom, setOpenChatroom] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const clickHandler = () => setOpenChatroom((prev) => !prev);
  const changeHandler = (event) => {
    setMessage(event.target.value)
  }


  return (
    <div className="relative">
      {openChatroom && (
        <div className="absolute bottom-24 right-10 bg-white rounded-xl p-2 w-[350px] h-[500px] shadow-md flex flex-col justify-between">
          <div className="flex-none">This is top</div>
          <div className="flex-grow">This is middle</div>
          <div className="flex-none flex items-center relative">
            <input
              type="text"
              placeholder="Enter messages"
              className="py-1 px-2 w-full bg-[#e2e2e2] rounded-xl flex-none"
              onChange={changeHandler}
              value={message}
            ></input>
            {message.length > 0 && <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-black rounded-lg p-1"
              onClick={() => {
                /* Handle send message */
              }}
            >
              Send
            </button>}
            
          </div>
        </div>
      )}
      <button
        className={`text-black rounded-full bg-white w-14 h-12 flex items-center justify-center ${props.className} m-5`}
        onClick={clickHandler}
      >
        {openChatroom ? "x" : "Chat"}
      </button>
    </div>
  );
};

export default index;
