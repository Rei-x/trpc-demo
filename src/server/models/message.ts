import SuperJSON from "superjson";
import { prisma } from "../db";
import { pusher } from "../pusher";

export const message = {
  get: async () => {
    return prisma.message.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        clientId: true,
        text: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
  },
  create: async ({
    text,
    userId,
    clientId,
  }: {
    text: string;
    userId: string;
    clientId?: string;
  }) => {
    const newMessage = await prisma.message.create({
      data: {
        text,
        userId,
        clientId,
      },
      select: {
        id: true,
        clientId: true,
        text: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    await pusher.trigger(
      "messages",
      "new-message",
      SuperJSON.stringify(newMessage)
    );

    return newMessage;
  },
};
