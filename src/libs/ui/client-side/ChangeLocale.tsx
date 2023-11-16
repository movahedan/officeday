"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useMemo } from "react";

import { defaultLocale, locales } from "@/libs/router";
import { classNames } from "@/libs/utilities/string";

export type ChangeLocaleProps = {
  className?: string;
};

export const ChangeLocale = ({ className }: ChangeLocaleProps) => {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const otherLocale = useMemo(
    () => locales.find((l) => l !== locale) || defaultLocale,
    [locale],
  );

  const url = useMemo(() => {
    const pageUrl = pathname?.split("/").slice(2).join("/");
    const fullUrl = [pageUrl, searchParams?.toString()].join("?");
    const localizedUrl = `/${otherLocale}/${fullUrl}`;

    return localizedUrl;
  }, [otherLocale, pathname, searchParams]);

  return (
    <Link href={url}>
      <Image
        width={59}
        height={59}
        src={`/images/flag-${otherLocale}.webp`}
        alt={`Change locale to ${otherLocale}`}
        className={classNames([
          "rounded-full hover:scale-125 hover:cursor-pointer border border-transparent",
          "hover:border-gray-400 hover:bg-gray-400 dark:hover:border-gray-200",
          "transition-all duration-300",
          className,
        ])}
      />
    </Link>
  );
};
