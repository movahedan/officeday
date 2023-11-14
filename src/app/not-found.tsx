import Link from "next/link";

import { routes } from "@/libs/constants";

import { Button } from "@/libs/ui/client-side";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center w-full my-auto">
      <h1 className="mb-16 text-3xl">404</h1>
      <h3 className="mb-16 text-xl">Not Found!</h3>

      <Link href={routes.index()}>
        <Button variant="green" className="px-16 py-8">
          Return Home
        </Button>
      </Link>
    </div>
  );
}