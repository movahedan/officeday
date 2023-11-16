"server only";
import { createTranslator as nextIntlCreateTranslator } from "next-intl";

import { defaultLocale } from "./routes";
import { cookieNames, parseCookies } from "../utilities/cookie";

import type { NextApiRequest } from "next";

export const createTranslator = async (
  req: NextApiRequest,
  namespace: string,
) => {
  const locale =
    parseCookies(req.headers.cookie, cookieNames.NEXT_LOCALE) || defaultLocale;

  return nextIntlCreateTranslator({
    locale,
    messages: await import(`../../../public/locales/${locale}.json`),
    namespace: namespace,
  });
};
