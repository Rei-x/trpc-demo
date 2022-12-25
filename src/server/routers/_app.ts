import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";

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
  product: router({
    get: publicProcedure.input(z.number()).query(({ input }) => {
      return {
        id: input,
        name: "Product",
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
