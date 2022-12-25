import { useCreateMessage } from "@/hooks/useCreateMessage";
import { nanoid } from "nanoid";
import React, { useState } from "react";

export const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { mutateAsync: createMessage } = useCreateMessage();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setMessage("");
        createMessage({
          text: message,
          clientId: nanoid(),
        });
      }}
      className="flex w-full"
    >
      <div className="form-control w-full">
        <input
          className="input w-full input-secondary focus:outline-none rounded-none rounded-bl-lg"
          type="text"
          name="message"
          autoComplete="off"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn rounded-none rounded-br-lg">
        send
      </button>
    </form>
  );
};
