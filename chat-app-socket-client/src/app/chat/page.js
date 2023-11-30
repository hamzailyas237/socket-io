"use client";

import { useEffect, useState } from "react";
import { ChatBody } from "./components/chatBody";
import { ChatFooter } from "./components/chatFooter";
import { ChatBar } from "./components/chatBar";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody messages={messages} typingStatus={typingStatus} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
