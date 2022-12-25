import { trpc } from "@/utils/trpc";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";

export const useCreateMessage = () => {
  const utils = trpc.useContext();
  const session = useSession();
  return trpc.message.create.useMutation({
    onMutate: async (data) => {
      await utils.message.get.cancel();

      const previousMessages = utils.message.get.getData();
      utils.message.get.setData(undefined, (old) => {
        const id = data.clientId ?? nanoid();

        const newMessage = {
          id,
          clientId: id,
          text: data.text,
          userId: session.data?.user?.id ?? "",
          user: {
            id: session.data?.user?.id ?? "",
            name: session.data?.user?.name ?? "",
            email: session.data?.user?.email ?? "",
            image: session.data?.user?.image ?? "",
            emailVerified: new Date(),
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        if (typeof old !== "undefined") {
          return [newMessage, ...old];
        }
        return [newMessage];
      });

      return { previousMessages };
    },
    onError: (err, data, context) => {
      utils.message.get.setData(undefined, context?.previousMessages);
    },
  });
};
