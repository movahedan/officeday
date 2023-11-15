import { getTranslations } from "next-intl/server";

import { Link, routes } from "@/libs/router";

import { Button } from "@/libs/ui/client-side";

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.
export default async function NotFound() {
  const t = await getTranslations("pages.not-found");
  const tGeneral = await getTranslations("general");

  return (
    <div className="flex flex-col items-center w-full my-auto">
      <h1 className="mb-16 text-3xl">{t("status")}</h1>
      <h3 className="mb-16 text-xl">{t("title")}</h3>

      <Link href={routes.index()}>
        <Button variant="green" className="px-16 py-8">
          {tGeneral("go-home")}
        </Button>
      </Link>
    </div>
  );
}
