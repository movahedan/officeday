"use client";

import { useTranslations } from "next-intl";

import { Link, routes } from "@/libs/router";
import { classNames } from "@/libs/utilities/string";

import { Button } from "./Button";

export type ErrorComponentProps = {
  error?: string | (Error & { digest?: string });
  className?: string;
};

export const ErrorComponent = ({ error, className }: ErrorComponentProps) => {
  const t = useTranslations("general");

  return (
    <div className={classNames(["flex flex-col my-auto", className])}>
      <p>
        {typeof error === "string"
          ? error
          : error?.message || error?.digest || t("unexpected-error")}
      </p>

      <Link href={routes.groupEvent.create()} className="mx-auto mt-16">
        <Button variant="green" className="px-12 py-8 bg-green-400 rounded-md">
          {t("create-an-event")}
        </Button>
      </Link>
    </div>
  );
};
