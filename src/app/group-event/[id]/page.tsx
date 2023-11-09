"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCopyToClipboard, useTimeoutFn } from "react-use";
import useSWR from "swr";

import { routes } from "@/libs/constants/routes";
import { Loading } from "@/libs/ui/Loading";
import { GroupEventEditForm } from "@/libs/ui/forms/GroupEventEditForm";
import { classNames, dateFormatter, fetcher } from "@/libs/utilities";

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

  const [copyState, copy] = useCopyToClipboard();
  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false);
  const [, , reset] = useTimeoutFn(() => {
    setCopyButtonDisabled((prev) => (prev ? !prev : prev));
  }, 2000);

  const groupEventUrl = useMemo(
    () =>
      groupEvent?.id
        ? `${window.location.origin}${routes.frontend.groupEvent.join(
            groupEvent?.id,
          )}`
        : null,
    [groupEvent?.id],
  );

  return (
    <main className="flex flex-col items-center h-full p-24">
      {!!error && (
        <div className="flex flex-col my-auto">
          <p>{error}</p>
          <Link
            href={routes.frontend.groupEvent.create()}
            className="px-12 py-8 mx-auto mt-16 bg-green-400 rounded-md"
          >
            Create an event
          </Link>
        </div>
      )}

      {!!groupEventUrl && !error && (
        <div className="w-full max-w-764">
          <div className="flex w-full">
            <p className="flex-1 px-24 py-8 bg-gray-100 border border-r-0 border-gray-400 border-dotted rounded-r-none rounded-l-md">
              {groupEventUrl}
            </p>

            <button
              onClick={() => {
                copy(groupEventUrl);
                setCopyButtonDisabled(true);
                reset();
              }}
              disabled={copyButtonDisabled}
              className={classNames([
                "w-128",
                "px-40 py-8 border outline-0",
                "rounded-md rounded-l-none",
                "transition-all duration-300",
                copyButtonDisabled && "bg-green-300 border-green-300",
              ])}
            >
              {copyButtonDisabled ? "Copied" : "Copy"}
            </button>
          </div>

          {!!copyState.error && (
            <p className="px-12 py-8 mt-8 bg-red-300">
              Unable to copy value: {copyState.error.message}
            </p>
          )}

          <div className="flex w-full mt-16">
            <div className="w-320">
              <h3 className="mb-8 text-lg">Edit suggestions</h3>
              <GroupEventEditForm id={id} />

              {!groupEvent?.invitees.length ? null : (
                <>
                  <h3 className="my-8 text-lg">Invitees</h3>
                  <ul>
                    {groupEvent.invitees.map((invitee) => (
                      <li key={invitee.person.name} className="w-full">
                        {invitee.person.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="w-full ml-16">
              <div className="flex mb-8">
                <h3 className="mr-auto text-lg">Suggested dates </h3>
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
        </div>
      )}
    </main>
  );
}
