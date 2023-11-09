import Link from "next/link";

import { routes } from "@/libs/constants";

export type ErrorComponentProps = {
  error?: string;
};

export const ErrorComponent = ({ error }: ErrorComponentProps) => (
  <div className="flex flex-col my-auto">
    <p>{error || "An unexpected error ocurred."}</p>
    <Link
      href={routes.frontend.groupEvent.create()}
      className="px-12 py-8 mx-auto mt-16 bg-green-400 rounded-md"
    >
      Create an event
    </Link>
  </div>
);
