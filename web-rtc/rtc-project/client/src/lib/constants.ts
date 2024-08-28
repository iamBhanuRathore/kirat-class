const constants = {
  CONNECTED: "connection_established", // Jab connection establish ho
  DISCONNECTED: "disconnected", // Jab connection disconnect ho

  CREATE_ROOM: "room_created", // Jab naya room create ho
  DELETE_ROOM: "room_deleted", // Jab room delete ho

  ADD_USER_TO_ROOM: "user_added_to_room", // Jab user ko room me add kiya jaye
  REMOVE_USER_FROM_ROOM: "user_removed_from_room", // Jab user ko room se remove kiya jaye

  EXIT_FROM_ROOM: "user_exited_room", // Jab user room se exit kare

  USER_MESSAGE: "user_message", // Jab user koi message bheje
  BROADCAST_MESSAGE: "broadcast_message", // Jab ek message ko sabhi users me broadcast karna ho

  ROOM_LIST: "room_list", // Agar tumhe sare rooms ki list bhejni ho
  USER_LIST: "user_list", // Agar tumhe room me users ki list bhejni ho
  ALL_USER_LIST: "user_list", // Agar tumhe All users ki list bhejni ho
  USER_LIST_UPDATE: "user_list_update",

  ROOM_CREATED_AND_JOINED: "room_created_and_joined",
  JOINED_EXISTING_ROOM: "joined_existing_room",
  ROOM_FULL: "room_full", // Jab room full ho jaye aur user ko add nahi kiya ja sakta

  // WebRTC events
  WEBRTC_OFFER: "webrtc_offer", // Jab ek WebRTC offer bheja jaye
  WEBRTC_ANSWER: "webrtc_answer", // Jab WebRTC offer ka jawab diya jaye
  WEBRTC_ICE_CANDIDATE: "webrtc_ice_candidate", // Jab ICE candidate bheja jaye
  WEBRTC_SESSION_END: "webrtc_session_end", // Jab WebRTC session end ho
};

export type MessageType = keyof typeof constants;

export default constants;
