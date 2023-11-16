import { useTranslations } from "next-intl";

import { classNames } from "@/libs/utilities/string";

import { ShareButtons } from "./ShareButtons";

export type CopyUrlProps = {
  url: string;
  className?: string;
};

export const CopyUrl = ({ url, className }: CopyUrlProps) => {
  const t = useTranslations("document");

  return (
    <div
      className={classNames([
        "flex flex-col w-full md:flex-row items-stretch justify-stretch",
        className,
      ])}
    >
      <div
        className={classNames([
          "flex flex-1 break-words bg-slate-200 dark:bg-gray-600",
          "border border-gray-400 border-dotted rounded-md",
        ])}
      >
        <p className="px-24 py-8 my-auto text-sm break-words">{url}</p>
      </div>

      <ShareButtons
        url={url}
        title={t("title")}
        text={t("description")}
        className="mt-8 md:mt-0 md:ml-8"
      />
    </div>
  );
};
