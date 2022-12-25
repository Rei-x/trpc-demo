import Image from "next/image";
import React from "react";
import { format } from "date-fns";

export const ChatMessage = ({
  username,
  userImage,
  createdAt,
  text,
}: {
  username: string;
  userImage: string;
  createdAt: Date;
  text: string;
}) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image width={192} height={192} alt="image" src={userImage} />
        </div>
      </div>
      <div className="chat-header">
        {username}
        <time className="text-xs opacity-50 ml-2">
          {format(createdAt, "HH:mm:ss")}
        </time>
      </div>
      <div className="chat-bubble">{text}</div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
};
