import { getTranslations } from "next-intl/server";

import { Link, routes } from "@/libs/router";

import { ChangeLocale, Button } from "@/libs/ui/client-side";

export default async function Home() {
  const t = await getTranslations("pages.home");

  return (
    <div className="flex items-center justify-center w-full h-full bg-cover bg-[url(/images/home-bg-large.webp)] bg-[50%_50%] xl:bg-[50%_70%]">
      <main className="inline-flex flex-col items-center justify-center mt-[-32px]">
        <p className="mb-40 text-4xl font-bold leading-tight text-center text-gray-900 md:text-5xl max-w-400 md:max-w-764">
          {t("title")}
        </p>
        <p className="mb-24 text-xl text-center text-gray-900 md:text-2xl leading-6 md:leading-8 md:max-w-764 max-w-400">
          {t("description")}
        </p>
        <div className="flex gap-16">
          <Link href={routes.groupEvent.create()}>
            <Button
              variant="green"
              className="px-32 py-12 rounded-full md:text-lg md:px-40 md:py-16"
            >
              {t("get-started")}
            </Button>
          </Link>
          <ChangeLocale />
        </div>
      </main>
    </div>
  );
}
