import { getTranslations } from "next-intl/server";

import { GroupEventCreateForm } from "@/libs/ui/forms/GroupEventCreateForm";

export default async function GroupEventCreatePage() {
  const t = await getTranslations("pages.group-event");

  return (
    <div className="m-auto max-w-400">
      <h1 className="text-xl text-center">{t("title")}</h1>
      <GroupEventCreateForm />
    </div>
  );
}
