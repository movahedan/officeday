import createMiddleware from "next-intl/middleware";

import { pathnames, locales } from "@/libs/router";

const middleware = createMiddleware({
  defaultLocale: "en",
  locales,
  pathnames,
});

export default middleware;

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|nl)/:path*"],
};
