import { WebSocket } from "ws";
import { userManager } from "./userManager";
import { Message, RTCMessage } from "../index";
import {
  WEBRTC_OFFER,
  WEBRTC_ANSWER,
  WEBRTC_ICE_CANDIDATE,
  WEBRTC_SESSION_END,
} from "./constants";

export const handleWebRTCOffer = (message: RTCMessage, ws: WebSocket) => {
  // Check if the offer exists
  if (message.offer) {
    const room = userManager.getRoomDetails(message.roomId);
    console.log(room);
    if (room) {
      room.users.forEach((user) => {
        if (user.userId !== message.userId) {
          user.socket.send(
            JSON.stringify({
              type: WEBRTC_OFFER,
              from: message.userId,
              offer: message.offer,
            })
          );
        }
      });
    }
  }
};

export const handleWebRTCAnswer = (message: RTCMessage, ws: WebSocket) => {
  if (message.answer) {
    // Check if the answer exists
    console.log(message);
    const room = userManager.getRoomDetails(message.roomId);
    // console.log(room);
    if (room) {
      room.users.forEach((user) => {
        if (user.userId !== message.userId) {
          //   console.log(user);
          user.socket.send(
            JSON.stringify({
              type: WEBRTC_ANSWER,
              from: message.userId,
              answer: message.answer,
            })
          );
        }
      });
    }
  }
};

export const handleWebRTCIceCandidate = (
  message: RTCMessage,
  ws: WebSocket
) => {
  if (message.candidate) {
    // Check if the candidate exists
    const room = userManager.getRoomDetails(message.roomId);
    if (room) {
      room.users.forEach((user) => {
        if (user.userId !== message.userId) {
          user.socket.send(
            JSON.stringify({
              type: WEBRTC_ICE_CANDIDATE,
              from: message.userId,
              candidate: message.candidate,
            })
          );
        }
      });
    }
  }
};

export const handleWebRTCSessionEnd = (message: Message, ws: WebSocket) => {
  const room = userManager.getRoomDetails(message.roomId);
  if (room) {
    room.users.forEach((user) => {
      user.socket.send(
        JSON.stringify({
          type: WEBRTC_SESSION_END,
          from: message.userId,
        })
      );
    });
  }
};
