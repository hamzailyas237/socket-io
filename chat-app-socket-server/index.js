const express = require("express");
const app = express();
const PORT = 5000;
// const { createServer } = require("node:http");
// const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http").Server(app);

app.use(cors());

// const server = createServer(app);
// const io = new Server(server);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

http.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
