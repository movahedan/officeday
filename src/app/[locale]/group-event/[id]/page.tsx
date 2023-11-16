"use client";

import { useTranslations } from "next-intl";

import { useGetApiGroupEventId } from "@/libs/data/default";
import { routes } from "@/libs/router";
import { GroupEventEditForm } from "@/libs/ui/forms/GroupEventEditForm";
import { classNames } from "@/libs/utilities/string";

import { CopyUrl, Button } from "@/libs/ui/client-side";
import { IconLoading, IconRefresh } from "@/libs/ui/icons";
import { List, SuggestedOptionsStatus } from "@/libs/ui/server-side";

export interface GroupEventOwnerPageProps {
  params: { id: string; locale: string };
}

export default function GroupEventOwnerPage({
  params: { id, locale },
}: GroupEventOwnerPageProps) {
  const t = useTranslations("pages.group-event-id");

  const {
    data: groupEvent,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useGetApiGroupEventId(id, { swr: { refreshInterval: 10000 } });

  if (error) throw error;

  const groupEventUrl = !groupEvent?.id
    ? null
    : `${window.location.origin}/${locale}${routes.groupEvent.join(
        groupEvent?.id,
      )}`;

  return !groupEventUrl || !groupEvent ? null : (
    <div className="w-full max-w-400 md:max-w-764">
      <CopyUrl url={groupEventUrl} />

      <div className="flex flex-col w-full mt-24 md:flex-row">
        <div className="w-full md:w-320">
          {!groupEvent.invitees.length ? null : (
            <>
              <h3 className="mb-8 text-lg">{t("titles.invitees")}</h3>
              <List
                keys={(name) => name}
                items={groupEvent.invitees.map(
                  (invitee) => invitee.person.name,
                )}
                className="mb-20 md:mb-16"
              />
            </>
          )}

          <h3 className="mb-8 text-lg">{t("titles.edit-suggestions")}</h3>
          <GroupEventEditForm id={id} />
        </div>

        <div className="w-full mt-20 md:mt-0 md:ml-16">
          {!!groupEvent && (
            <>
              <div className="flex mb-8">
                <h3 className="mr-auto text-lg">
                  {t("titles.suggested-dates")}
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
                        !(isLoading || isValidating)
                          ? "-rotate-180"
                          : "rotate-180",
                      ])}
                    />
                  )}
                </Button>
              </div>

              <SuggestedOptionsStatus
                invitees={groupEvent?.invitees}
                suggestedOptions={groupEvent?.suggestedOptions}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
