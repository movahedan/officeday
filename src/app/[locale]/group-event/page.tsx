import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { GroupEventCreateForm } from "@/libs/ui/forms/GroupEventCreateForm";

import type { Locales } from "@/libs/router";

export type GroupEventCreatePageProps = {
  params: { locale: Locales };
};

export default async function GroupEventCreatePage({
  params: { locale },
}: GroupEventCreatePageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("pages.group-event");

  return (
    <div className="m-auto max-w-400">
      <h1 className="mb-16 text-xl text-center">{t("title")}</h1>
      <GroupEventCreateForm />
    </div>
  );
}
