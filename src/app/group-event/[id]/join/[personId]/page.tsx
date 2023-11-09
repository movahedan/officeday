"use client";
import useSWR from "swr";

import { routes } from "@/libs/constants/routes";
import { ErrorComponent } from "@/libs/ui/ErrorComponent";
import { Loading } from "@/libs/ui/Loading";
import { SuggestedOptionsStatus } from "@/libs/ui/SuggestedOptionStatus";
import { GroupEventSelectOptionsForm } from "@/libs/ui/forms/GroupEventSelectOptions";
import { classNames, fetcher } from "@/libs/utilities";

import type { GroupEvent } from "@/libs/prisma/types";

export type GroupEventSelectOptionsPageProps = {
  params: {
    id: string;
    personId: string;
  };
};

export default function GroupEventSelectOptionsPage({
  params: { id, personId },
}: GroupEventSelectOptionsPageProps) {
  const {
    data: groupEvent,
    error,
    isLoading,
    isValidating,
  } = useSWR<GroupEvent>(routes.backend.groupEvent.get(id), fetcher, {
    refreshInterval: 1000,
  });

  return (
    <>
      {error ? (
        <ErrorComponent error={error} />
      ) : groupEvent ? (
        <div className="flex flex-col w-full md:flex-row max-w-400 md:max-w-764">
          <div className="w-full m-auto md:w-320">
            {!!groupEvent && (
              <>
                <h3 className="mb-16 text-lg">Select possible options</h3>

                <GroupEventSelectOptionsForm
                  id={id}
                  personId={personId}
                  suggestedOptions={groupEvent?.suggestedOptions || []}
                  possibleOptionsIds={
                    groupEvent?.invitees
                      .find((i) => i.person.id === personId)
                      ?.possibleOptions.map((o) => o.id) || []
                  }
                />
              </>
            )}
          </div>

          <div className="flex-1 mt-20 md:mt-0 md:ml-16">
            <div className="flex mb-8">
              <h3 className="mr-auto text-lg">Status of suggested options</h3>
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
              suggestedOptions={groupEvent?.suggestedOptions}
              invitees={groupEvent?.invitees}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
