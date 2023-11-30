"use client";

// import { socket } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { io } from "socket.io-client";
export const socket = io("http://localhost:5000");

const Home = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    // calling event to handle active users on the platform
    socket.emit("newUser", { userName, socketID: socket.id });
    router.push("chat");
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;
