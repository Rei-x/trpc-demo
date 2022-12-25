import React, { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { useAutoAnimate } from "@formkit/auto-animate/react";
interface ChatMessage {
  clientId: string;
  createdAt: Date;
  text: string;
  user: {
    image?: string | null;
    name?: string | null;
  };
}

export const ChatList = ({ messages }: { messages: ChatMessage[] }) => {
  const [chatBox] = useAutoAnimate<HTMLUListElement>();

  useEffect(() => {
    chatBox.current?.scrollTo({
      top: chatBox.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatBox, messages]);

  return (
    <ul
      className="overflow-y-scroll max-h-[600px] border border-gray-800 rounded-t-md p-4"
      ref={chatBox}
    >
      {messages?.map((message) => (
        <ChatMessage
          key={message.clientId}
          userImage={message.user.image ?? ""}
          text={message.text}
          createdAt={message.createdAt}
          username={message.user.name ?? "user"}
        />
      ))}
    </ul>
  );
};
