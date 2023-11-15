import { getTranslations } from "next-intl/server";

import { GroupEventJoinForm } from "@/libs/ui/forms/GroupEventJoinForm";

export type GroupEventJoinPageProps = {
  params: {
    id: string;
  };
};

export default async function GroupEventJoinPage({
  params: { id },
}: GroupEventJoinPageProps) {
  const t = await getTranslations("pages.group-event-id-join");

  return (
    <div className="m-auto max-w-400">
      <h1 className="text-xl text-center">{t("title")}</h1>
      <GroupEventJoinForm id={id} />
    </div>
  );
}
