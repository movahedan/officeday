"use client";
import Link from "next/link";

import { routes } from "@/libs/constants/routes";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-full p-24">
      <Link href={routes.frontend.event.create()}>Start</Link>
    </main>
  );
}
