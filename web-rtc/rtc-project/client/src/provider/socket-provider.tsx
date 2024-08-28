import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { Message } from "../index";
import { MessageType } from "../lib/constants";

// Define types for the WebSocket context
type WebSocketStatus = "connecting" | "connected" | "disconnected";

interface WebSocketContextValue {
  socket: WebSocket | null;
  status: WebSocketStatus;
  isConnecting: boolean;
  connect: () => void;
  reconnect: () => void;
  messages: any;
}

// Create context with a default value
const WebSocketContext = createContext<WebSocketContextValue | null>(null);
type AllMessages = {
  [K in MessageType]?: Message[]; // Optional keys, as not all message types may be present initially
};
interface WebSocketProviderProps {
  children: ReactNode;
  url: string;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  url,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>("disconnected");
  const [messages, setMessages] = useState<AllMessages>({});
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);

  const connect = () => {
    setIsConnecting(true);
    setStatus("connecting");
    const ws = new WebSocket(url);

    socketRef.current = ws;
    ws.onopen = () => {
      setIsConnecting(false);
      setStatus("connected");
      setSocket(ws);
    };

    ws.onclose = () => {
      setStatus("disconnected");
      setSocket(null);
      // Optionally, you can handle reconnection here
      //   reconnect();
    };

    ws.onerror = (error) => {
      setStatus("disconnected");
      console.error("WebSocket error:", error);
    };
    ws.onmessage = (event) => {
      const incomingMessage: Message = JSON.parse(event.data);

      setMessages((prev) => {
        const newMessages = { ...prev };
        if (newMessages[incomingMessage.type]) {
          newMessages[incomingMessage.type] = [
            ...newMessages[incomingMessage.type]!,
            incomingMessage,
          ];
        } else {
          newMessages[incomingMessage.type] = [incomingMessage];
        }
        return newMessages;
      });
      console.log("WebSocket message received:", event.data);
    };
  };

  const reconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
    connect();
  };

  useEffect(() => {
    connect(); // Initial connection

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url]);

  const contextValue: WebSocketContextValue = {
    socket,
    status,
    isConnecting,
    connect,
    reconnect,
    messages,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextValue => {
  const context = useContext(WebSocketContext);
  if (context === null) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
