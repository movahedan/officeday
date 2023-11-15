"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

import { defaultLocale, locales } from "@/libs/router";
import { classNames } from "@/libs/utilities/string";

export type ChangeLocaleProps = {
  className?: string;
};

export const ChangeLocale = ({ className }: ChangeLocaleProps) => {
  const locale = useLocale();
  const otherLocale = locales.find((l) => l !== locale) || defaultLocale;

  return (
    <Link href={`/${otherLocale}`}>
      <Image
        width={59}
        height={59}
        src={`/images/flag-${otherLocale}.webp`}
        alt={`Change locale to ${otherLocale}`}
        className={classNames(["rounded-full", className])}
      />
    </Link>
  );
};
