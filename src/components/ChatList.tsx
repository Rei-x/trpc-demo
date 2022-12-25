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
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [chatBox, messages]);
  return (
    <ul
      className="max-h-96 overflow-y-auto border border-gray-800 rounded-md p-4"
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
