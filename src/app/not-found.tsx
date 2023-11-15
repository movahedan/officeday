"use client";

// Do not use @/libs/router since at this point there's no locale
import Link from "next/link";

import { routes } from "@/libs/router";

import { Button } from "@/libs/ui/client-side";

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.
export default function NotFound() {
  return (
    <div className="flex flex-col items-center w-full my-auto">
      <h1 className="mb-16 text-3xl">404</h1>
      <h3 className="mb-16 text-xl">Not Found!</h3>

      <Link href={routes.index()}>
        <Button variant="green" className="px-16 py-8">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
