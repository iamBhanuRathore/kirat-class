// import { writeFileSync, appendFileSync } from "fs";
// import { userManager } from "./userManager";
// const logRoomState = () => {
//   const rooms = userManager.getAllRooms();
//   const logData = rooms.map((room) => {
//     return {
//       roomId: room.roomId,
//       users: room.users.map((user) => user.userId),
//     };
//   });

//   appendFileSync(
//     "room_state.log",
//     JSON.stringify(logData, null, 2) + "\n",
//     "utf-8"
//   );
// };
