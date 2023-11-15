import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { locales, pathnames } from "./routes";

import type { Pathnames } from "next-intl/navigation";

export { notFound } from "next/navigation";
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation<typeof locales, Pathnames<typeof locales>>(
    {
      locales,
      pathnames,
    },
  );
