import { RouterOutput, trpc } from "@/utils/trpc";
import { useEvent, useChannel } from "@harelpls/use-pusher";
import { Message } from "@prisma/client";
import uniqBy from "lodash/fp/uniqBy";
import SuperJSON from "superjson";
import { SuperJSONResult } from "superjson/dist/types";

export const useMessages = () => {
  const utils = trpc.useContext();

  useEvent(
    useChannel("messages"),
    "new-message",
    (newMessageString?: SuperJSONResult) => {
      if (!newMessageString) {
        return;
      }

      const newMessage = SuperJSON.deserialize<
        RouterOutput["message"]["get"][number]
      >(newMessageString ?? "");

      utils.message.get.setData(undefined, (old) => {
        if (typeof old !== "undefined") {
          return uniqBy((message) => message.clientId, [newMessage, ...old]);
        }

        return [newMessage];
      });
    }
  );

  return trpc.message.get.useQuery(undefined, {
    staleTime: Infinity,
  });
};
