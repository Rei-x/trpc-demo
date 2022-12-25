import { z } from "zod";
import { message } from "../models/message";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const messageRouter = router({
  get: publicProcedure.query(async () => {
    return message.get();
  }),
  create: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        clientId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newMessage = await message.create({
        text: input.text,
        userId: ctx.session.user.id,
        clientId: input.clientId,
      });

      return newMessage;
    }),
});
