import React from "react";
import Link from "next/link";
import { UserButton } from '@stackframe/stack';
import { stackServerApp } from "@/stack";

export default async function Home() {
    const user = await stackServerApp.getUser({ or: 'redirect' });

    return (
      <div>
          <nav>
            <UserButton/>
            Hi, {user?.displayName || 'friend'}!</nav>
        <Link href="/tasks/add">+</Link>
        <Link href={"tasks/view"}>View all tasks</Link>
      </div>
  );
}
