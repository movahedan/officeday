"use client";
import Link from "next/link";
import useSWR from "swr";

import { routes } from "@/libs/constants/routes";
import { Loading } from "@/libs/ui/Loading";
import { GroupEventSelectOptionsForm } from "@/libs/ui/forms/GroupEventSelectOptions";
import { classNames, dateFormatter, fetcher } from "@/libs/utilities";

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
    <main className="flex flex-col items-center justify-between h-full p-24">
      {error ? (
        <div className="flex flex-col my-auto">
          <p>{error}</p>
          <Link
            href={routes.frontend.groupEvent.create()}
            className="px-12 py-8 mx-auto mt-16 bg-green-400 rounded-md"
          >
            Create an event
          </Link>
        </div>
      ) : (
        <div className="flex w-full max-w-764">
          <div className="m-auto w-320">
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

          <div className="flex-1 ml-16">
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

            <ul className="w-full overflow-hidden [&>*:nth-child(odd)]:bg-slate-200 [&>*:nth-child(even)]:bg-slate-100 rounded-md">
              {groupEvent?.suggestedOptions.map((option) => {
                const votedPeople = groupEvent.invitees
                  .filter((invitee) =>
                    invitee.possibleOptions
                      .map((option) => option.id)
                      .includes(option.id),
                  )
                  .map((invitee) => invitee.person.name);

                return (
                  <li key={option.id} className="w-full p-8 last:mb-0">
                    <span className="mr-4">
                      {dateFormatter(new Date(option.date))}:
                    </span>
                    <span>
                      {votedPeople.length === 0
                        ? "Not possible"
                        : votedPeople.join("-")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
