"use client";
import { useMemo } from "react";
import useSWR from "swr";

import { routes } from "@/libs/constants/routes";
import { CopyUrl } from "@/libs/ui/CopyUrl";
import { ErrorComponent } from "@/libs/ui/ErrorComponent";
import { Loading } from "@/libs/ui/Loading";
import { SuggestedOptionsStatus } from "@/libs/ui/SuggestedOptionStatus";
import { GroupEventEditForm } from "@/libs/ui/forms/GroupEventEditForm";
import { fetcher } from "@/libs/utilities/fetcher";
import { classNames } from "@/libs/utilities/string";

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
    mutate,
  } = useSWR<GroupEvent>(routes.backend.groupEvent.get(id), fetcher, {
    refreshInterval: 10000,
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
                    <button
                      onClick={() => mutate()}
                      className="px-8 py-4 my-auto ml-auto mr-0 border rounded-md hover:bg-slate-100 hover:shadow-sm"
                    >
                      {isLoading || isValidating ? (
                        <Loading width="16" height="16" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="16"
                          height="16"
                          viewBox="0 0 30 30"
                          className={classNames([
                            "transition-all duration-300",
                            !(isLoading || isValidating)
                              ? "-rotate-180"
                              : "rotate-180",
                          ])}
                        >
                          <path d="M 15 3 C 12.053086 3 9.3294211 4.0897803 7.2558594 5.8359375 A 1.0001 1.0001 0 1 0 8.5449219 7.3652344 C 10.27136 5.9113916 12.546914 5 15 5 C 20.226608 5 24.456683 8.9136179 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.441216 7.8348596 21.297943 3 15 3 z M 4.3007812 9 L 0.30078125 15 L 3 15 C 3 21.635519 8.3644809 27 15 27 C 17.946914 27 20.670579 25.91022 22.744141 24.164062 A 1.0001 1.0001 0 1 0 21.455078 22.634766 C 19.72864 24.088608 17.453086 25 15 25 C 9.4355191 25 5 20.564481 5 15 L 8.3007812 15 L 4.3007812 9 z"></path>
                        </svg>
                      )}
                    </button>
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
