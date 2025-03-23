"use client";
import Header from "@/components/Header/Header";
import "./globals.css";
import { ReactNode } from "react";
import { AccountProvider } from "@/components/AccountContext/AccountContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>Weather Analytics</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AccountProvider>
          <Header />
          <main>{children}</main>
          <div className="flex justify-center h-[10vh] bg-gray-400">
            <p className="mt-[2vh]">© 2025 Weather Analytics</p>
          </div>
        </AccountProvider>
      </body>
    </html>
  );
}
