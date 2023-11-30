"use client";

import { useState } from "react";

export const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleKeyDown = () => {
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);
  };

  const handleKeyUp = () => {
    setTimeout(() => {
      socket.emit("typing", "");
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};
