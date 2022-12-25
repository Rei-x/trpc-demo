import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import React, { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  const session = useSession();

  return (
    <div className="max-h-screen">
      <Head>
        <title>tRPC chat</title>
        <meta name="description" content="Chat app that uses tRPC and pusher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="navbar px-10">
        <div className="flex-1">
          <p className="text-lg">tRPC chat</p>
        </div>
        <div className="flex-none">
          <ul className="menu-horizontal">
            {session.status === "authenticated" ? (
              <>
                <li className="my-auto mr-4">{session.data?.user?.name}</li>
                <button
                  className="btn"
                  onClick={() => {
                    signOut();
                  }}
                >
                  sign out
                </button>
              </>
            ) : (
              <li>
                <button
                  className="btn"
                  onClick={() => {
                    signIn("github");
                  }}
                >
                  login
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
};
