"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCopyToClipboard, useTimeoutFn } from "react-use";
import useSWR from "swr";

import { envs, routes } from "@/libs/constants";
import { Button, Loading, Text } from "@/libs/ui/atoms";
import { EditRoomForm } from "@/libs/ui/molecules/EditRoomForm/EditRoomForm";
import { classNames, dateFormatter, fetcher } from "@/libs/utilities";

import type { OfficeDayEvent } from "@/app/api/events.type";

interface EventRoomProps {
  params: { id: string };
}

export default function EventRoom({ params: { id } }: EventRoomProps) {
  const {
    data: officeDayEvent,
    error,
    isLoading,
    isValidating,
  } = useSWR<OfficeDayEvent>(routes.backend.room.get(id), fetcher, {
    refreshInterval: 1000,
  });

  const [copyState, copy] = useCopyToClipboard();
  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false);
  const [, , reset] = useTimeoutFn(() => {
    setCopyButtonDisabled((prev) => (prev ? !prev : prev));
  }, 2000);

  const roomUrl = useMemo(
    () =>
      officeDayEvent?.id
        ? `${envs().baseUrl}/event/${officeDayEvent?.id}`
        : null,
    [officeDayEvent?.id],
  );

  return (
    <main className="flex flex-col items-center h-full p-24">
      {!!error && (
        <div className="flex flex-col my-auto">
          <Text>{error}</Text>
          <Link
            href={routes.frontend.event.create()}
            className="px-12 py-8 mx-auto mt-16 bg-green-400 rounded-md"
          >
            Create a room
          </Link>
        </div>
      )}

      {!!roomUrl && !error && (
        <div>
          <div className="flex">
            <Text className="px-24 py-8 bg-gray-100 border border-r-0 border-gray-400 border-dotted rounded-r-none rounded-l-md">
              {roomUrl}
            </Text>

            <Button
              onClick={() => {
                copy(roomUrl);
                setCopyButtonDisabled(true);
                reset();
              }}
              disabled={copyButtonDisabled}
              className={classNames([
                "py-8 rounded-l-none",
                copyButtonDisabled && "bg-green-300 border-green-300",
              ])}
            >
              {copyButtonDisabled ? "Copied" : "Copy"}
            </Button>
          </div>

          {!!copyState.error && (
            <p className="px-12 py-8 mt-8 bg-red-300">
              Unable to copy value: {copyState.error.message}
            </p>
          )}

          <Loading
            width="64"
            height="64"
            className={!(isLoading || isValidating) ? "opacity-0" : ""}
          />

          <div className="flex">
            <EditRoomForm id={id} />
            <ul>
              {officeDayEvent?.suggestedOptions.map((option) => (
                <li key={option.id}>
                  {dateFormatter(new Date(option.date))}:{" "}
                  {officeDayEvent.invitees
                    .filter((invitee) =>
                      invitee.possibleOptions.includes(option.id),
                    )
                    .map((invitee) => invitee.name)
                    .join("-")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
