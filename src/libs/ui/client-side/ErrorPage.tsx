"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Link, routes } from "@/libs/router";
import { ErrorComponent } from "@/libs/ui/client-side/ErrorComponent";
import { errorHandlerApp } from "@/libs/utilities/error-handlers";

import { Button } from "./Button";

export function ErrorPage({
  error,
  reset,
}: {
  error: string | (Error & { digest?: string });
  reset?: () => void;
}) {
  const t = useTranslations("general");
  const router = useRouter();

  useEffect(() => {
    errorHandlerApp(error);
  }, [error]);

  return (
    <div className="w-full my-auto text-center">
      <ErrorComponent error={error} />

      <div className="inline-flex mx-auto mt-16 space-x-8">
        {!!reset && (
          <Button variant="transparent" onClick={() => reset()}>
            {t("try-again")}
          </Button>
        )}
        <Button variant="transparent" onClick={() => router.refresh()}>
          {t("reload")}
        </Button>
        <Link href={routes.index()}>
          <Button variant="transparent">{t("go-home")}</Button>
        </Link>
      </div>
    </div>
  );
}
