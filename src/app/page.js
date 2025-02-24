"use client"
import Link from "next/link";
import { UserButton, useUser } from '@stackframe/stack';

export default function Home() {
    const user = useUser({ or: 'redirect' });

    return (
      <div>
          <nav>
            <UserButton/>
            Hi, {user?.displayName || 'friend'}!
        </nav>
        <Link href="/tasks/add">+</Link>
      </div>
  );
}
