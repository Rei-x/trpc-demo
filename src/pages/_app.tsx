import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { PusherProvider } from "@harelpls/use-pusher";

const config = {
  clientKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
};

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider>
      <PusherProvider {...config}>
        <Component {...pageProps} />
      </PusherProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
