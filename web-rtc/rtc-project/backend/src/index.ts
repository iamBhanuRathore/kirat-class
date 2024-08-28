import express from "express";
import { createServer } from "http";
import cors from "cors";
import { WebSocketServer } from "ws";
import { handleMessage } from "./messages";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    handleMessage(message, ws);
  });
  ws.on("close", (type) => {
    console.log(type);
  });
});

server.listen(8080, () => {
  console.log("Socker Server is listening on port: 8080");
});
