"use client";
import { useTranslations } from "next-intl";

import { useGetApiGroupEventId } from "@/libs/data/default";
import { routes } from "@/libs/router";
import { ReloadButton } from "@/libs/ui/client-side/ReloadButton";
import { GroupEventEditForm } from "@/libs/ui/forms/GroupEventEditForm";

import { CopyUrl } from "@/libs/ui/client-side";
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
          <h3 className="mb-8 text-lg">{t("titles.edit-suggestions")}</h3>
          <GroupEventEditForm id={id} />

          {!groupEvent.invitees.length ? null : (
            <>
              <h3 className="mt-20 mb-8 text-lg md:mt-16">
                {t("titles.invitees")}
              </h3>
              <List
                keys={(name) => name}
                items={groupEvent.invitees.map((invitee) => invitee.name)}
              />
            </>
          )}
        </div>

        <div className="w-full mt-20 md:mt-0 md:ml-16">
          {!!groupEvent && (
            <>
              <div className="flex mb-8">
                <h3 className="mr-auto text-lg">
                  {t("titles.suggested-dates")}
                </h3>

                <ReloadButton
                  isLoading={isLoading || isValidating}
                  onReload={mutate}
                />
              </div>

              {!groupEvent.invitees.length ? (
                <p>{t("lets-invite-others")}</p>
              ) : (
                <SuggestedOptionsStatus
                  invitees={groupEvent?.invitees}
                  options={groupEvent?.options}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
