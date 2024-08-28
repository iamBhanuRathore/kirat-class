import { WebSocket } from "ws";
import {
  ADD_USER_TO_ROOM,
  CREATE_ROOM,
  DELETE_ROOM,
  EXIT_FROM_ROOM,
  REMOVE_USER_FROM_ROOM,
  WEBRTC_ANSWER,
  WEBRTC_ICE_CANDIDATE,
  WEBRTC_OFFER,
  WEBRTC_SESSION_END,
} from "./constants";
import { userManager } from "./userManager";
import { Message } from "../index";
import {
  handleWebRTCAnswer,
  handleWebRTCIceCandidate,
  handleWebRTCOffer,
  handleWebRTCSessionEnd,
} from "./webrtc";
export const handleMessage = (data: any, ws: WebSocket) => {
  try {
    const message: Message = JSON.parse(data); // Message ko parse karo
    // console.log(message);
    if (typeof message.type !== "string") {
      console.error("Invalid message format");
      return;
    }

    switch (message.type) {
      case CREATE_ROOM:
        console.log("CREATE_ROOM");
        // Room create karne ka logic
        const roomId = message.roomId;
        const roomCreated = userManager.createRoom(roomId);
        if (roomCreated) {
          ws.send(JSON.stringify({ success: true, type: CREATE_ROOM, roomId }));
        } else {
          ws.send(
            JSON.stringify({
              success: false,
              type: CREATE_ROOM,
              error: "Room already exists",
            })
          );
        }
        break;

      case ADD_USER_TO_ROOM:
        console.log("ADD_USER_TO_ROOM");
        // User ko room me add karne ka logic
        const user = { userId: message.userId, socket: ws };
        const addResult = userManager.addUserToRoom(message.roomId, user);
        const userInRoom = userManager.getRoomDetails(message.userId);
        if (addResult === "room_full") {
          ws.send(
            JSON.stringify({
              success: false,
              type: addResult,
              roomId: message.roomId,
              userInRoom,
            })
          );
          break;
        }
        ws.send(
          JSON.stringify({
            success: true,
            type: addResult,
            roomId: message.roomId,
            userInRoom,
          })
        );
        break;

      case DELETE_ROOM:
        console.log("DELETE_ROOM");
        // Room delete karne ka logic
        const roomDeleted = userManager.deleteRoom(message.roomId);
        ws.send(
          JSON.stringify({
            success: roomDeleted,
            type: DELETE_ROOM,
            roomId: message.roomId,
          })
        );
        break;

      case REMOVE_USER_FROM_ROOM:
        console.log("REMOVE_USER_FROM_ROOM");
        // Room se user remove karne ka logic
        userManager.removeUserFromRoom(message.roomId, message.userId);
        ws.send(
          JSON.stringify({
            success: true,
            type: REMOVE_USER_FROM_ROOM,
            roomId: message.roomId,
          })
        );
        break;

      case EXIT_FROM_ROOM:
        console.log("EXIT_FROM_ROOM");
        // User ko room se exit karane ka logic
        userManager.removeUserFromRoom(message.roomId, message.userId);
        ws.send(
          JSON.stringify({
            success: true,
            type: EXIT_FROM_ROOM,
            roomId: message.roomId,
          })
        );
        break;

      case WEBRTC_OFFER:
        console.log("WEBRTC_OFFER");
        handleWebRTCOffer(message, ws);
        break;

      case WEBRTC_ANSWER:
        console.log("WEBRTC_ANSWER");
        handleWebRTCAnswer(message, ws);
        break;

      case WEBRTC_ICE_CANDIDATE:
        console.log("WEBRTC_ICE_CANDIDATE");
        handleWebRTCIceCandidate(message, ws);
        break;

      case WEBRTC_SESSION_END:
        console.log("WEBRTC_SESSION_END");
        handleWebRTCSessionEnd(message, ws);
        break;
      default:
        ws.send(
          JSON.stringify({ success: false, error: "Unknown message type" })
        );
    }
  } catch (error: any) {
    console.error("Failed to handle message:", error.message);
    ws.send(
      JSON.stringify({ success: false, error: "Failed to process message" })
    );
  }
};
