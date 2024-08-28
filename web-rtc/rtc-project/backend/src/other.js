// ws package import karo
const WebSocket = require("ws");
// WebSocket server ka URL specify karo
const ws = new WebSocket("ws://localhost:8080");

// Jab connection open ho, to ye function execute hoga
ws.on("open", () => {
  console.log("Connected to the WebSocket server");
  // Server ko message bhejo
  ws.send(
    JSON.stringify({
      type: "user_added_to_room",
      roomId: "first",
    })
  );
});

// Jab server se message mile, to ye function execute hoga
ws.on("message", (data) => {
  console.log(JSON.parse(data));
});

// Agar connection close ho jaye to ye function execute hoga
ws.on("close", () => {
  console.log("Disconnected from the WebSocket server");
});

// Agar error aaye to ye function execute hoga
ws.on("error", (error) => {
  console.error(`WebSocket error: ${error}`);
});
