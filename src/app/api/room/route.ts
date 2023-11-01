import { NextResponse } from "next/server";

import { addOfficeDayEvent, getOfficeDayEvents } from "../events";

import type { NewOfficeDayEvent } from "../events.type";

export const POST = async (request: Request) => {
  const { owner, suggestedOptions } =
    (await request.json()) as NewOfficeDayEvent;

  if (!owner.name || !suggestedOptions.length) {
    return NextResponse.json(
      { error: "Owner name and options are required" },
      { status: 400 },
    );
  }

  if (suggestedOptions.find((option) => new Date(option.date) < new Date())) {
    return NextResponse.json(
      { error: "Date cannot be in the past" },
      { status: 400 },
    );
  }

  const officeDayEvent = addOfficeDayEvent({ owner, suggestedOptions });

  return NextResponse.json(officeDayEvent, {
    status: 201,
    statusText: "Room created successfully",
  });
};

export const GET = async () => {
  const events = getOfficeDayEvents();

  return NextResponse.json(events, {
    status: 200,
  });
};
