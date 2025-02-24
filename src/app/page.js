"use client";
import Link from "next/link";
import { UserButton, useUser } from '@stackframe/stack';

export default function Home() {
    useUser({ or: 'redirect' });
    return (
      <div>
          <nav>
            <UserButton/>
        </nav>
        <Link href="/add">+</Link>
      </div>
  );
}
