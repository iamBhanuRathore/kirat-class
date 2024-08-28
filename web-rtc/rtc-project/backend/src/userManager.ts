import { WebSocket } from "ws";
import {
  JOINED_EXISTING_ROOM,
  ROOM_CREATED_AND_JOINED,
  ROOM_FULL,
  USER_LIST_UPDATE,
} from "./constants";

// User type defines the structure for user objects, with userId and WebSocket.
type User = {
  userId: string;
  socket: WebSocket;
};

// Room type defines the structure for room objects, with roomId and a list of users.
type Room = {
  roomId: string;
  users: User[];
};

// UserManager class is responsible for managing users and rooms in the system.
class UserManager {
  // Static instance to ensure Singleton pattern.
  private static instance: UserManager;
  // Map to store rooms with roomId as key and Room object as value.
  private rooms: Map<string, Room>;

  // Private constructor to prevent direct instantiation.
  private constructor() {
    this.rooms = new Map<string, Room>();
  }

  // Static method to return the Singleton instance of UserManager.
  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  // Method to create a new room with the given roomId.
  // Returns true if the room is successfully created, false if it already exists.
  public createRoom(roomId: string): boolean {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, { roomId, users: [] });
      return true;
    }
    return false;
  }

  // Method to delete an existing room with the given roomId.
  // Returns true if the room is successfully deleted, false if the room does not exist.
  public deleteRoom(roomId: string): boolean {
    if (this.rooms.has(roomId)) {
      this.rooms.delete(roomId);
      return true;
    }
    return false;
  }

  // Method to add a user to a room with the given roomId.
  public addUserToRoom(
    roomId: string,
    user: User
  ):
    | typeof ROOM_CREATED_AND_JOINED
    | typeof JOINED_EXISTING_ROOM
    | typeof ROOM_FULL {
    let room = this.rooms.get(roomId);
    if (!room) {
      // Naya room create hua aur user us room me add hua
      room = { roomId, users: [] };
      room.users.push(user);
      this.rooms.set(roomId, room);
      this.broadcastUserList(roomId); // Broadcast updated user list
      return ROOM_CREATED_AND_JOINED;
    }

    if (room.users.length < 3) {
      // Existing room me user ko add kiya gaya
      room.users.push(user);
      this.broadcastUserList(roomId); // Broadcast updated user list
      return JOINED_EXISTING_ROOM;
    } else {
      // Room full hai, user ko add nahi kiya gaya
      return ROOM_FULL;
    }
  }

  // Method to remove a user from a room with the given roomId.
  // If the room becomes empty after removal, the room is deleted.
  public removeUserFromRoom(roomId: string, userId: string): void {
    const room = this.rooms.get(roomId);

    if (room) {
      room.users = room.users.filter((user) => user.userId !== userId);

      if (room.users.length === 0) {
        this.rooms.delete(roomId);
        console.log(`Room ${roomId} deleted as it became empty.`);
      } else {
        this.broadcastUserList(roomId); // Broadcast updated user list
      }
    }
  }

  // Method to find and return the room where a specific user is located.
  // Returns the room if found, otherwise returns undefined.
  public findRoomByUserId(userId: string): Room | undefined {
    for (const room of this.rooms.values()) {
      if (room.users.some((user) => user.userId === userId)) {
        return room;
      }
    }
    return undefined;
  }

  // Method to retrieve all users in a specific room by roomId.
  // Returns an array of users if the room exists, otherwise returns undefined.
  public getUsersInRoom(roomId: string): User[] | undefined {
    const room = this.rooms.get(roomId);
    return room?.users;
  }

  // Method to retrieve all rooms managed by UserManager.
  // Returns an array of Room objects.
  public getAllRooms(): Room[] {
    return Array.from(this.rooms.values());
  }

  // Method to get details of a specific room by roomId.
  // Returns the Room object if the room exists, otherwise returns undefined.
  public getRoomDetails(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  // Method to check if a specific room is full (i.e., has 3 users).
  // Returns true if the room is full, otherwise false.
  public isRoomFull(roomId: string): boolean {
    const room = this.rooms.get(roomId);
    return room ? room.users.length >= 3 : false;
  }

  // Method to broadcast a message to all users in a specific room by roomId.
  // The message is sent to each user's WebSocket.
  public broadcastToRoom(roomId: string, message: string): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.users.forEach((user) => {
        user.socket.send(message);
      });
    }
  }
  public broadcastUserList(roomId: string): void {
    const room = this.rooms.get(roomId);
    if (room) {
      const userList = room.users.map((user) => user.userId);
      this.broadcastToRoom(
        roomId,
        JSON.stringify({
          type: USER_LIST_UPDATE,
          users: userList,
        })
      );
    }
  }
  // Method to get details of a specific user by userId, regardless of which room they are in.
  // Returns the User object if found, otherwise returns undefined.
  public getUserDetails(userId: string): User | undefined {
    for (const room of this.rooms.values()) {
      const user = room.users.find((user) => user.userId === userId);
      if (user) {
        return user;
      }
    }
    return undefined;
  }
}

// Exporting the singleton instance of UserManager for use throughout the application.
export const userManager = UserManager.getInstance();
