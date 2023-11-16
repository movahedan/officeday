"use client";

import { useTranslations } from "next-intl";

import { useGetApiGroupEventId } from "@/libs/data/default";
import { GroupEventSelectOptionsForm } from "@/libs/ui/forms/GroupEventSelectOptions";
import { classNames } from "@/libs/utilities/string";

import { Button } from "@/libs/ui/client-side";
import { IconLoading, IconRefresh } from "@/libs/ui/icons";
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

  if (error) {
    const cloned = error;
    throw cloned;
  }

  return !groupEvent ? null : (
    <div className="flex flex-col w-full md:flex-row max-w-400 md:max-w-764">
      <div className="w-full m-auto md:w-320">
        <h3 className="mb-16 text-lg">{t("titles.select-possible-options")}</h3>

        <GroupEventSelectOptionsForm
          id={id}
          personId={personId}
          suggestedOptions={groupEvent.suggestedOptions || []}
          possibleOptionsIds={
            groupEvent.invitees
              .find((i) => i.person.id === personId)
              ?.possibleOptions.map((o) => o.id) || []
          }
        />
      </div>

      <div className="flex-1 mt-20 md:mt-0 md:ml-16">
        <div className="flex mb-8">
          <h3 className="mr-auto text-lg">
            {t("titles.status-of-suggested-options")}
          </h3>

          <Button
            variant="white"
            onClick={() => mutate()}
            className="px-8 py-4 border"
          >
            {isLoading || isValidating ? (
              <IconLoading width={16} height={16} />
            ) : (
              <IconRefresh
                width={16}
                height={16}
                className={classNames([
                  "transition-all duration-300",
                  !(isLoading || isValidating) ? "-rotate-180" : "rotate-180",
                ])}
              />
            )}
          </Button>
        </div>

        <SuggestedOptionsStatus
          suggestedOptions={groupEvent.suggestedOptions}
          invitees={groupEvent.invitees}
        />
      </div>
    </div>
  );
}
