"use server"
import { Sniglet } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import "./globals.css";

const sniglet = Sniglet({
    weight: "400",
    subsets: ["latin"]
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sniglet.variable}`}
      >
      <StackProvider app={stackServerApp}><StackTheme>
        {children}
      </StackTheme></StackProvider></body>
    </html>
  );
}
