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
        <div className="w-full max-w-400 md:max-w-764">
          <div className="flex flex-col w-full md:flex-row">
            <p
              className={classNames([
                "flex-1 px-24 py-8 break-words bg-gray-100 ",
                "border border-gray-400 border-dotted border-b-0 rounded-b-none rounded-t-md",
                "md:border-b md:border-r-0 md:rounded-r-none md:rounded-l-md",
              ])}
            >
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
                "w-full md:w-128",
                "px-40 py-6 border outline-0",
                "rounded-l-md rounded-b-md rounded-t-none md:rounded-md md:rounded-l-none",
                copyButtonDisabled &&
                  "bg-green-500 border-green-500 text-white",
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

              <ul className="overflow-hidden [&>*:nth-child(odd)]:bg-slate-200 [&>*:nth-child(even)]:bg-slate-100 rounded-md">
                {groupEvent?.suggestedOptions.map((option) => {
                  const votedPeople = groupEvent.invitees
                    .filter((invitee) =>
                      invitee.possibleOptions
                        .map((option) => option.id)
                        .includes(option.id),
                    )
                    .map((invitee) => invitee.person.name);

                  return (
                    <li key={option.id} className="w-full p-8">
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
