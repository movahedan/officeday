import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { GroupEventJoinForm } from "@/libs/ui/forms/GroupEventJoinForm";

import type { Locales } from "@/libs/router";

export type GroupEventJoinPageProps = {
  params: {
    id: string;
    locale: Locales;
  };
};

export default async function GroupEventJoinPage({
  params: { id, locale },
}: GroupEventJoinPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("pages.group-event-id-join");

  return (
    <div className="m-auto max-w-400">
      <h1 className="mb-16 text-xl text-center">{t("title")}</h1>
      <GroupEventJoinForm id={id} />
    </div>
  );
}
