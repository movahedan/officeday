"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCopyToClipboard, useTimeoutFn } from "react-use";
import { twMerge } from "tailwind-merge";

import { classNames } from "@/libs/utilities/string";

export type CopyUrlProps = {
  url: string;
  className?: string;
};

export const CopyUrl = ({ url, className }: CopyUrlProps) => {
  const t = useTranslations("components.copy-url");

  const [copyState, copy] = useCopyToClipboard();
  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false);
  const [, , reset] = useTimeoutFn(() => {
    setCopyButtonDisabled((prev) => (prev ? !prev : prev));
  }, 2000);

  return (
    <div
      className={classNames(["flex flex-col w-full md:flex-row", className])}
    >
      <p
        className={classNames([
          "flex-1 px-24 py-8 break-words bg-slate-200 dark:bg-gray-600",
          "border border-gray-400 border-dotted border-b-0 rounded-b-none rounded-t-md",
          "md:border-b md:border-r-0 md:rounded-r-none md:rounded-l-md",
        ])}
      >
        {url}
      </p>

      <button
        onClick={() => {
          copy(url);
          setCopyButtonDisabled(true);
          reset();
        }}
        disabled={copyButtonDisabled}
        className={twMerge(
          classNames([
            "w-full md:w-128 py-6 transition-all duration-100",
            " border outline-0 rounded-l-md rounded-b-md rounded-t-none md:rounded-md md:rounded-l-none",
            copyButtonDisabled
              ? "bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 text-slate-200"
              : copyState.error
              ? "bg-red-500 border-red-500 text-slate-200"
              : "border-gray-300 bg-slate-50 hover:bg-slate-200 dark:border-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500",
          ]),
        )}
      >
        {copyState.error
          ? t("error")
          : copyButtonDisabled
          ? t("copied")
          : t("copy")}
      </button>
    </div>
  );
};
