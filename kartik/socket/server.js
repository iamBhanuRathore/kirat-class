// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();
  
app.use(express.json());
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle real-time updates, if necessary
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
