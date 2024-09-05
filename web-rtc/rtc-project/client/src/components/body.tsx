import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "../lib/utils";
import { useWebSocket } from "../provider/socket-provider";
import { useLocation } from "react-router-dom";
import Constants from "../lib/constants";
const Body = () => {
  return <SingleComponent />;
};

export default Body;

const SingleComponent = () => {
  const { connect, isConnecting, reconnect, socket, status, messages } =
    useWebSocket();
  const [roomId, setRoomId] = useState<string>("");
  const [pc, setPC] = useState<RTCPeerConnection>(new RTCPeerConnection());
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  //   console.log(searchParams.get("userId"));
  //   useEffect(() => {
  // console.log({ connect, isConnecting, reconnect, socket, status, messages });
  //   }, [connect, isConnecting, reconnect, socket, status, messages]);
  useEffect(() => {
    // socket();
    if (!socket?.onmessage) return;
    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === Constants.WEBRTC_OFFER) {
        await pc.setRemoteDescription(message.offer);
        let answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        pc.onicecandidate = (event) => {
          console.log(event);
          if (event.candidate) {
            socket.send(
              JSON.stringify({
                type: Constants.WEBRTC_ICE_CANDIDATE,
                candidate: event.candidate,
                userId,
                roomId,
              })
            );
          }
        };
        // pc.oniceconnectionstatechange = () => {
        //   console.log("ICE Connection State:", pc.iceConnectionState);
        // };
        // pc.onsignalingstatechange = () => {
        //   console.log("Signaling State:", pc.signalingState);
        // };
        setPC(pc);
        socket.send(
          JSON.stringify({
            type: Constants.WEBRTC_ANSWER,
            answer,
            userId,
            roomId,
          })
        );
        // console.log("From Server", message);
      } else if (message.type === Constants.WEBRTC_ANSWER) {
        await pc.setRemoteDescription(message.answer);
        pc.onicecandidate = (event) => {
          console.log(event);
          if (event.candidate) {
            socket.send(
              JSON.stringify({
                type: Constants.WEBRTC_ICE_CANDIDATE,
                candidate: event.candidate,
                userId,
                roomId,
              })
            );
          }
        };
        // pc.oniceconnectionstatechange = () => {
        //   console.log("ICE Connection State:", pc.iceConnectionState);
        // };

        // pc.onsignalingstatechange = () => {
        //   console.log("Signaling State:", pc.signalingState);
        // };
        setPC(pc);
      } else if (message.type === Constants.WEBRTC_ICE_CANDIDATE) {
        await pc.addIceCandidate(message.candidate);
        setPC(pc);
      }
    };
  }, [socket, roomId, pc]);
  const onConnectRoom = () => {
    socket?.send(
      JSON.stringify({
        type: Constants.ADD_USER_TO_ROOM,
        roomId,
        userId: userId,
      })
    );
    // initiateConn();
  };
  const initiateConn = async () => {
    if (!socket) {
      alert("Socket not found");
      return;
    }

    // const pc = new RTCPeerConnection();
    const offer = await pc.createOffer();
    // console.log("Created offer:", offer);
    await pc.setLocalDescription(offer);
    // console.log(pc.localDescription, offer);
    setPC(pc);
    // console.log("Local description set:", pc.localDescription);
    // sending the offer to the signalling server ---> other side -----> WHEN IT IS SENDER
    socket.send(
      JSON.stringify({
        type: Constants.WEBRTC_OFFER,
        offer,
        roomId,
        userId,
      })
    );

    // setPC(pc);
    pc.onicecandidate = (event) => {
      console.log(event);
      if (event.candidate) {
        console.log("ICE Candidate:", event.candidate);
        socket?.send(
          JSON.stringify({
            type: "iceCandidate",
            candidate: event.candidate,
          })
        );
      }
    };

    // recieving the offer ---------> WHEN THIS IS RECIEVER
    // socket.onmessage = async (event) => {
    //   const message = JSON.parse(event.data);
    //   if (message.type === Constants.WEBRTC_OFFER) {
    //     await pc.setRemoteDescription(message.sdp);
    //   }
    // };
    pc.onicegatheringstatechange = () => {
      console.log("ICE gathering state changed:", pc.iceGatheringState);
    };
    pc.onsignalingstatechange = () => {
      console.log("Signaling state changed:", pc.signalingState);
    };
  };

  const getCameraStreamAndSend = (pc: RTCPeerConnection) => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      // this is wrong, should propogate via a component
      document.body.appendChild(video);
      stream.getTracks().forEach((track) => {
        pc?.addTrack(track);
      });
    });
  };

  return (
    <div className="p-5 flex flex-col flex-1 h-full">
      <div className="flex flex-col gap-y-5 flex-1">
        <div className="flex gap-x-2 items-center">
          <Input
            onChange={(e) => setRoomId(e.target.value)}
            className="border-[1px] border-gray-400"
            placeholder="Enter the Room Id"
          />
          <Button onClick={onConnectRoom} className="h-fit dark:text-gray-200">
            Search
          </Button>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <p>Sender</p>
            <Button className="dark:text-gray-200" onClick={initiateConn}>
              Create Offer
            </Button>
          </div>
          <div>
            <p>Reciever</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CopyButtonWrapper = ({
  children,
  className,
  copyValue,
}: {
  children: React.ReactNode;
  className?: any;
  copyValue: string;
}) => {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked) {
      const timeout = setTimeout(() => {
        setClicked(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [clicked]);
  return (
    <div className="w-full h-full relative cursor-pointer ">
      {children}
      {clicked ? (
        <Check
          className={cn("absolute right-0 top-1/2 -translate-y-1/2", className)}
        />
      ) : (
        <Copy
          onClick={() => {
            setClicked(true);
            navigator.clipboard.writeText(copyValue);
          }}
          className={cn("absolute right-0 top-1/2 -translate-y-1/2", className)}
        />
      )}
    </div>
  );
};
