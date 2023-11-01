import { NextResponse } from "next/server";

import {
  editOfficeDayEventSuggestedOptions,
  getOfficeDayEvent,
} from "../../events";

import type { OfficeDayEvent } from "../../events.type";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const id = decodeURIComponent(url.pathname.split("/")[3]);
  const officeDayEvent = getOfficeDayEvent(id);

  if (!officeDayEvent) {
    return NextResponse.json(
      { error: "No room with this ID was existed." },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(officeDayEvent, {
    status: 200,
  });
};

export const PUT = async (request: Request) => {
  const { id, suggestedOptions } = (await request.json()) as OfficeDayEvent;

  if (!suggestedOptions.length) {
    return NextResponse.json(
      { error: "Please enter at least one option" },
      { status: 400 },
    );
  }

  if (suggestedOptions.find((option) => new Date(option.date) < new Date())) {
    return NextResponse.json(
      { error: "Date cannot be in the past" },
      { status: 400 },
    );
  }

  const officeDayEvent = editOfficeDayEventSuggestedOptions({
    id,
    suggestedOptions,
  });

  return NextResponse.json(officeDayEvent, {
    status: 201,
    statusText: "Suggested options successfully",
  });
};
