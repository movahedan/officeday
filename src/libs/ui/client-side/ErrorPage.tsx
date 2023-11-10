"use client";

import { useEffect } from "react";

import { ErrorComponent } from "@/libs/ui/client-side/ErrorComponent";
import { errorHandlerApp } from "@/libs/utilities/error-handlers";

import { Button } from "./Button";

export function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    errorHandlerApp(error);
  }, [error]);

  return (
    <div className="w-full my-auto text-center">
      <ErrorComponent error={error} />
      <Button variant="red" onClick={() => reset()} className="mx-auto mt-16">
        Try again
      </Button>
    </div>
  );
}
