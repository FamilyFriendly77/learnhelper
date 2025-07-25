"use client";

import { QueryClient, useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { UserQuery } from "../../../utils/queryFunctions";
import { socket } from "../../../lib/socketClient";
import Message from "./Message";

export default function Chat({
  session,
  SkillId,
}: {
  session: Session | null;
  SkillId: number;
}) {
  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<
    { sender: string; senderName: string; message: string }[]
  >([]);
  const [chatOpen, setChatOpen] = useState(false);
  const queryClient = new QueryClient();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserQuery(session),
  });
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
        room: `${SkillId}${userData.id}`,
        username: userData.name,
      });
    }
  };
  const handleSendMessage = (message: string) => {
    const data = {
      room: `${SkillId}${userData.id}`,
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
    <div className="fixed bottom-0 right-32 w-96 h-fit flex-col transition-all">
      <div className=" w-96 h-16 flex justify-between px-8 items-center text-2xl font-bold text-[#EBEBEB] border-2 border-[#171A21] bg-[#FF1F1F] rounded-t-3xl">
        <span>Ask a question</span>
        <div
          onClick={() => {
            handleOpenChat();
            setChatOpen(!chatOpen);
          }}
        >
          {chatOpen ? (
            <ArrowDown
              color="#EBEBEB"
              size={32}
              className="hover:translate-y-1 active:scale-120 transition-all"
            />
          ) : (
            <ArrowUp
              color="#EBEBEB"
              size={32}
              className="hover:-translate-y-1 active:scale-120 transition-all"
            />
          )}
        </div>
      </div>
      {chatOpen ? (
        <div className="w-full h-112 border-x-2 border-[#171A21] bg-[#EBEBEB] flex-col items-center">
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
      ) : null}
    </div>
  );
}
