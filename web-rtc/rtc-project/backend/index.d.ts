import { MessageType } from "./src/constants";

type Message = {
  type: MessageType;
  roomId: string;
  userId: string;
};

type RTCMessage = Message & {
  offer?: string;
  answer?: string;
  candidate?: string;
};
