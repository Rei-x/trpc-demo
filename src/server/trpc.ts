import { initTRPC, TRPCError } from "@trpc/server";
import { Session } from "next-auth";
import SuperJSON from "superjson";
import { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

interface SessionWithUser extends Session {
  user: NonNullable<Session["user"]>;
}

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session as SessionWithUser,
    },
  });
});

export const middleware = t.middleware;
export const router = t.router;
/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;
/**
 * Protected procedure
 */
export const protectedProcedure = t.procedure.use(isAuthed);
