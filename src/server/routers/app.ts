import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { messageRouter } from "./message.router";

export const appRouter = router({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      const randomText = Math.random().toString(36).substring(7);

      return {
        text: `${input.text} ${randomText}`,
        session: ctx.session,
      };
    }),
  message: messageRouter
});

export type AppRouter = typeof appRouter;
