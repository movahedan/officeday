"use client";
import useSWR from "swr";

import { routes } from "@/libs/constants";
import { Button } from "@/libs/ui/client-side/Button";
import { CopyUrl } from "@/libs/ui/client-side/CopyUrl";
import { GroupEventEditForm } from "@/libs/ui/forms/GroupEventEditForm";
import { fetcher } from "@/libs/utilities/fetcher";
import { classNames } from "@/libs/utilities/string";

import { IconLoading, IconRefresh } from "@/libs/ui/icons";
import {
  ErrorComponent,
  List,
  SuggestedOptionsStatus,
} from "@/libs/ui/server-side";

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

  const groupEventUrl = !groupEvent?.id
    ? null
    : `${window.location.origin}${routes.frontend.groupEvent.join(
        groupEvent?.id,
      )}`;

  return (
    <>
      {!!error && <ErrorComponent error={error} />}

      {!!groupEventUrl && !error && (
        <div className="w-full max-w-400 md:max-w-764">
          <CopyUrl url={groupEventUrl} />

          <div className="flex flex-col w-full mt-24 md:flex-row">
            <div className="w-full md:w-320">
              {!groupEvent?.invitees.length ? null : (
                <>
                  <h3 className="mb-8 text-lg">Invitees</h3>
                  <List
                    keys={(name) => name}
                    items={groupEvent.invitees.map(
                      (invitee) => invitee.person.name,
                    )}
                    className="mb-20 md:mb-16"
                  />
                </>
              )}

              <h3 className="mb-8 text-lg">Edit suggestions</h3>
              <GroupEventEditForm id={id} />
            </div>

            <div className="w-full mt-20 md:mt-0 md:ml-16">
              {!!groupEvent && (
                <>
                  <div className="flex mb-8">
                    <h3 className="mr-auto text-lg">Suggested dates</h3>
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
      )}
    </>
  );
}
