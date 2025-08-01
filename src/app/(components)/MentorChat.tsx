"use client";
import { useEffect, useState } from "react";
import { UserType } from "../../../utils/types";
import { socket } from "../../../lib/socketClient";
import Message from "./Message";
import { ArrowRight } from "lucide-react";

export default function MentorChat({
  skillId,
  userData,
}: {
  skillId: number;
  userData: UserType;
}) {
  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<
    { sender: string; senderName: string; message: string }[]
  >([]);
  const [chatOpen, setChatOpen] = useState(false);
  useEffect(() => {
    socket.on(
      "message",
      (data: { sender: string; senderName: string; message: string }) => {
        setMessages((prev) => [...prev, data]);
      },
    );
    socket.on("user__joined", (message) => {
      setMessages((prev) => [
        ...prev,
        { sender: "system", senderName: "system", message },
      ]);
    });
    return () => {
      console.log("Dissconected");
      socket.off("user__joined");
      socket.off("message");
    };
  }, []);
  //To be changed to handle different rooms
  const handleOpenChat = () => {
    if (!chatOpen) {
      socket.emit("join-room", {
        //tbc to room from db
        room: `${skillId}${userData.id}`,
        username: userData.name,
      });
    }
  };
  const handleSendMessage = (message: string) => {
    const data = {
      //tbc to room from DB
      room: `${skillId}${userData.id}`,
      message: message,
      sender: userData.id,
      senderName: userData.name,
    };
    setMessages((prev) => [
      ...prev,
      { sender: userData.id, senderName: userData.name, message },
    ]);
    socket.emit("message", data);
  };

  return (
    <div className="w-fit flex flex-col justify-center items-center h-fit bg-[$EBEBEB]">
      <div className=" w-96 h-16 flex justify-between px-8 items-center text-2xl font-bold text-[#EBEBEB] border-2 border-[#171A21] bg-[#FF1F1F] ">
        <span>Answer Questions</span>
        <div
          onClick={() => {
            handleOpenChat();
            setChatOpen(!chatOpen);
          }}
        ></div>
      </div>
      <div className="w-full h-112 border-x-2 border-b-2 border-[#171A21] bg-[#EBEBEB] flex-col items-center">
        <div className="w-full h-[80%] border-b-3">
          {messages.map((message) => (
            <Message
              key={`${message.message}${message.sender}`}
              sentBy={
                message.sender === userData.id
                  ? "user"
                  : message.sender === "system"
                    ? "system"
                    : message.senderName
              }
              message={message.message}
            />
          ))}
        </div>
        <div className="flex flex-row justify-center items-center w-full h-[20%] gap-2 px-4">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessageInput(e.target.value)
            }
            value={messageInput}
            type="text"
            className="w-full h-16 bg-[#dfe0e2] overflow-y-scroll border-[#171A21] grow-7 rounded-xl px-6 text-wrap"
          />
          <button
            className="grow-3 hover:scale-120 transition-all"
            onClick={() => handleSendMessage(messageInput)}
          >
            <ArrowRight size={36} />
          </button>
        </div>
      </div>
    </div>
  );
}
