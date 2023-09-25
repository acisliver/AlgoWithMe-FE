import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./component/ChatInput";
import Message from "./component/Message";

const data = {
  projectId: 123,
  messageHistory: [
    {
      messageId: 1,
      memberId: 1,
      memberName: "John Doe",
      messageType: "ENTER",
      createdAt: "2023-09-22T23:34:00",
      systemMessage: "John Doe님이 입장했습니다.",
    },
    {
      messageId: 2,
      memberId: 1,
      memberName: "John Doe",
      messageType: "MESSAGE",
      createdAt: "2023-09-22T23:35:00",
      message: "Hello, how are you?",
    },
    {
      messageId: 3,
      memberId: 2,
      memberName: "Jane Doe",
      messageType: "MESSAGE",
      createdAt: "2023-09-22T23:36:00",
      message: "I'm good, thank you!",
    },
    {
      messageId: 4,
      memberId: 1,
      memberName: "John Doe",
      messageType: "EXIT",
      createdAt: "2023-09-22T23:37:00",
      systemMessage: "John Doe님이 나갔습니다.",
    },
  ],
};

const index = (props) => {
  const [openChatroom, setOpenChatroom] = useState(false);
  const [messages, setMessages] = useState(data.messageHistory);
  const messageListRef = useRef(null); // Create a ref

  const clickHandler = () => setOpenChatroom((prev) => !prev);

  const enterHandler = (newMessage) => {
    const messageForm = {
      messageId: 3,
      memberId: 2,
      memberName: "Jane Doe",
      messageType: "MESSAGE",
      createdAt: "2023-09-22T23:36:00",
      message: newMessage,
    };

    setMessages((prev) => [...prev, messageForm]);
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight; // Scroll to bottom
    }
  }, [messages]); // Trigger whenever messages array updates

  return (
    <div className="relative">
      {openChatroom && (
        <div className="absolute bottom-24 right-10 bg-[#2B3244] border-2 border-[#8E9DC7] rounded-xl p-2 w-[400px] h-[500px] shadow-md flex flex-col justify-between">
          <div className="flex-none text-center text-white">This is top</div>
          <div className="flex-grow overflow-auto" ref={messageListRef}>
            <ul className="message-list p-0 m-0">
              {messages.map((message, index) => (
                <li key={message.messageId || index} className="list-none mb-2">
                  <Message
                    messageType={message.messageType}
                    memberName={message.memberName}
                    message={message.message}
                    systemMessage={message.systemMessage}
                    createdAt={message.createdAt}
                  />
                </li>
              ))}
            </ul>
          </div>
          <ChatInput onEnter={enterHandler} />
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
