import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { Link, routes } from "@/libs/router";

import { ChangeLocale, Button, DarkModeToggle } from "@/libs/ui/client-side";

import type { Locales } from "@/libs/router";

export type HomeProps = {
  params: { locale: Locales };
};

export default async function Home({ params: { locale } }: HomeProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("pages.home");

  return (
    <div className="flex items-center justify-center w-full h-full">
      <main className="inline-flex flex-col items-center justify-center mt-[-32px]">
        <p className="mb-40 text-4xl font-bold leading-tight text-center md:text-5xl max-w-400 md:max-w-764">
          {t("title")}
        </p>
        <p className="mb-24 text-xl text-center md:text-2xl leading-6 md:leading-8 md:max-w-764 max-w-400">
          {t("description")}
        </p>
        <div className="flex items-center gap-16">
          <Link href={routes.groupEvent.create()}>
            <Button
              variant="green"
              className="h-48 px-32 py-12 rounded-full md:text-lg md:px-40 md:py-16 md:h-64"
            >
              {t("get-started")}
            </Button>
          </Link>
          <ChangeLocale className="w-48 h-48 md:w-64 md:h-64" />
          <DarkModeToggle className="w-48 h-48 md:w-64 md:h-64" />
        </div>
      </main>
    </div>
  );
}
