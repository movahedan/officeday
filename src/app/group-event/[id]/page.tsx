"use client";
import { useMemo } from "react";
import useSWR from "swr";

import { routes } from "@/libs/constants/routes";
import { CopyUrl } from "@/libs/ui/CopyUrl";
import { ErrorComponent } from "@/libs/ui/ErrorComponent";
import { Loading } from "@/libs/ui/Loading";
import { SuggestedOptionsStatus } from "@/libs/ui/SuggestedOptionStatus";
import { GroupEventEditForm } from "@/libs/ui/forms/GroupEventEditForm";
import { classNames, fetcher } from "@/libs/utilities";

import type { GroupEvent } from "@/libs/prisma/types";

interface EventRoomProps {
  params: { id: string };
}

export default function GroupEventOwnerPage({
  params: { id },
}: EventRoomProps) {
  const {
    data: groupEvent,
    error,
    isLoading,
    isValidating,
  } = useSWR<GroupEvent>(routes.backend.groupEvent.get(id), fetcher, {
    refreshInterval: 1000,
  });

  const groupEventUrl = useMemo(() => {
    if (!groupEvent?.id) return null;

    const url = routes.frontend.groupEvent.join(groupEvent?.id);

    return `${window.location.origin}${url}`;
  }, [groupEvent?.id]);

  return (
    <>
      {!!error && <ErrorComponent error={error} />}

      {!!groupEventUrl && !error && (
        <div className="w-full max-w-400 md:max-w-764">
          <CopyUrl url={groupEventUrl} />

          <div className="flex flex-col w-full mt-24 md:flex-row">
            <div className="w-full md:w-320">
              <h3 className="mb-8 text-lg">Edit suggestions</h3>
              <GroupEventEditForm id={id} />

              {!groupEvent?.invitees.length ? null : (
                <>
                  <h3 className="mt-20 mb-8 text-lg md:mt-8">Invitees</h3>
                  <ul className="overflow-hidden [&>*:nth-child(odd)]:bg-slate-200 [&>*:nth-child(even)]:bg-slate-100 rounded-md">
                    {groupEvent.invitees.map((invitee) => (
                      <li key={invitee.person.name} className="w-full p-8">
                        {invitee.person.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="w-full mt-20 md:mt-0 md:ml-16">
              {!!groupEvent && (
                <>
                  <div className="flex mb-8">
                    <h3 className="mr-auto text-lg">Suggested dates</h3>
                    <Loading
                      width="32"
                      height="32"
                      className={classNames([
                        "ml-auto mr-0",
                        !(isLoading || isValidating) ? "opacity-0" : "",
                      ])}
                    />
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
      )}
    </>
  );
}
