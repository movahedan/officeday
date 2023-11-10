"use client";
import Link from "next/link";

import { routes } from "@/libs/constants";
import { classNames } from "@/libs/utilities/string";

import { Button } from "./Button";

export type ErrorComponentProps = {
  error?: string | (Error & { digest?: string });
  className?: string;
};

export const ErrorComponent = ({ error, className }: ErrorComponentProps) => (
  <div className={classNames(["flex flex-col my-auto", className])}>
    <p>
      {typeof error === "string"
        ? error
        : error?.message || error?.digest || "An unexpected error ocurred."}
    </p>

    <Link href={routes.frontend.groupEvent.create()} className="mx-auto mt-16">
      <Button variant="green" className="px-12 py-8 bg-green-400 rounded-md">
        Create an event
      </Button>
    </Link>
  </div>
);
