export const CONNECTED = "connection_established"; // Jab connection establish ho
export const DISCONNECTED = "disconnected"; // Jab connection disconnect ho

export const CREATE_ROOM = "room_created"; // Jab naya room create ho
export const DELETE_ROOM = "room_deleted"; // Jab room delete ho

export const ADD_USER_TO_ROOM = "user_added_to_room"; // Jab user ko room me add kiya jaye
export const REMOVE_USER_FROM_ROOM = "user_removed_from_room"; // Jab user ko room se remove kiya jaye

export const EXIT_FROM_ROOM = "user_exited_room"; // Jab user room se exit kare

export const USER_MESSAGE = "user_message"; // Jab user koi message bheje
export const BROADCAST_MESSAGE = "broadcast_message"; // Jab ek message ko sabhi users me broadcast karna ho

export const ROOM_LIST = "room_list"; // Agar tumhe sare rooms ki list bhejni ho
export const USER_LIST = "user_list"; // Agar tumhe room me users ki list bhejni ho
export const ALL_USER_LIST = "user_list"; // Agar tumhe All users ki list bhejni ho
export const USER_LIST_UPDATE = "user_list_update";

export const ROOM_CREATED_AND_JOINED = "room_created_and_joined";
export const JOINED_EXISTING_ROOM = "joined_existing_room";
export const ROOM_FULL = "room_full"; // Jab room full ho jaye aur user ko add nahi kiya ja sakta

// WebRTC events
export const WEBRTC_OFFER = "webrtc_offer"; // Jab ek WebRTC offer bheja jaye
export const WEBRTC_ANSWER = "webrtc_answer"; // Jab WebRTC offer ka jawab diya jaye
export const WEBRTC_ICE_CANDIDATE = "webrtc_ice_candidate"; // Jab ICE candidate bheja jaye
export const WEBRTC_SESSION_END = "webrtc_session_end"; // Jab WebRTC session end ho
export type MessageType =
  | typeof CONNECTED
  | typeof DISCONNECTED
  | typeof CREATE_ROOM
  | typeof DELETE_ROOM
  | typeof ADD_USER_TO_ROOM
  | typeof REMOVE_USER_FROM_ROOM
  | typeof EXIT_FROM_ROOM
  | typeof USER_MESSAGE
  | typeof BROADCAST_MESSAGE
  | typeof ROOM_LIST
  | typeof USER_LIST
  | typeof ALL_USER_LIST
  | typeof ROOM_CREATED_AND_JOINED
  | typeof JOINED_EXISTING_ROOM
  | typeof WEBRTC_OFFER
  | typeof WEBRTC_ANSWER
  | typeof WEBRTC_ICE_CANDIDATE
  | typeof WEBRTC_SESSION_END;
