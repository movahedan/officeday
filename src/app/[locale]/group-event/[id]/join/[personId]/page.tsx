"use client";

import { useTranslations } from "next-intl";

import { useGetApiGroupEventId } from "@/libs/data/default";
import { ReloadButton } from "@/libs/ui/client-side/ReloadButton";
import { GroupEventSelectOptionsForm } from "@/libs/ui/forms/GroupEventSelectOptions";

import { SuggestedOptionsStatus } from "@/libs/ui/server-side";

export type GroupEventSelectOptionsPageProps = {
  params: {
    id: string;
    personId: string;
  };
};

export default function GroupEventSelectOptionsPage({
  params: { id, personId },
}: GroupEventSelectOptionsPageProps) {
  const t = useTranslations("pages.group-event-id-join-person-id");

  const {
    data: groupEvent,
    error,
    mutate,
    isLoading,
    isValidating,
  } = useGetApiGroupEventId(id, {
    swr: {
      refreshInterval: 10000,
    },
  });

  const invitee = groupEvent?.invitees.find((i) => i.id === personId);

  if (error) throw error;

  return !groupEvent || !invitee ? null : (
    <div className="flex flex-col w-full max-w-400 md:max-w-764">
      <h2 className="mb-16 text-xl">
        {t("titles.name-title", { name: invitee.name })}
      </h2>

      <div className="w-full">
        <h3 className="mb-16 text-lg">{t("titles.select-possible-options")}</h3>

        <GroupEventSelectOptionsForm
          id={id}
          personId={personId}
          options={groupEvent.options || []}
          currentRsvps={invitee?.rsvps || []}
          onSubmit={() => mutate()}
        />
      </div>

      <div className="flex-1 mt-20">
        <div className="flex mb-8">
          <h3 className="mr-auto text-lg">
            {t("titles.status-of-suggested-options")}
          </h3>

          <ReloadButton
            isLoading={isLoading || isValidating}
            onReload={mutate}
          />
        </div>

        <SuggestedOptionsStatus
          options={groupEvent.options}
          invitees={groupEvent.invitees}
        />
      </div>
    </div>
  );
}
