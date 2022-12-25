import { useSession } from "next-auth/react";
import { useMessages } from "@/hooks/useMessages";
import { ChatList } from "@/components/ChatList";
import { Layout } from "@/components/Layout";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SendMessage } from "@/components/SendMessage";

export default function Home() {
  const { data: messages } = useMessages();
  const sortedMessages = messages?.sort((a, b) => {
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
  const session = useSession();

  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <Layout>
      <main className="container">
        <h2 className="text-4xl mb-4" key="message" id="message">
          Messages
        </h2>
        <div ref={parent}>
          {session.status === "authenticated" ? (
            <div className="w-full max-w-xl">
              <ChatList messages={sortedMessages ?? []} />
              <SendMessage />
            </div>
          ) : null}
          {session.status === "unauthenticated" ? (
            <p className="text-lg">Please login to see messages</p>
          ) : null}
          {session.status === "loading" ? (
            <p className="text-lg loading">Loading...</p>
          ) : null}
        </div>
      </main>
    </Layout>
  );
}
