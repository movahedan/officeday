import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma/client";

import type { NewGroupEvent } from "@/libs/prisma/types";

export const POST = async (request: Request) => {
  const { owner, suggestedOptions } = (await request.json()) as NewGroupEvent;

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

  try {
    const groupEvent = await prisma.groupEvent.create({
      data: {
        owner: {
          connectOrCreate: {
            where: { name: owner.name },
            create: { name: owner.name },
          },
        },
        suggestedOptions: {
          createMany: {
            data: suggestedOptions.map((option) => ({
              date: new Date(option.date),
            })),
          },
        },
      },
    });

    return NextResponse.json(groupEvent, {
      status: 201,
      statusText: "Group event created successfully",
    });
  } catch (error) {
    console.error({ error });

    return NextResponse.json(
      { error: "Failed to create group event" },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const events = await prisma.groupEvent.findMany({
      include: {
        owner: true,
        suggestedOptions: true,
        // Assuming invitees are to be included
        invitees: {
          include: {
            person: true,
            possibleOptions: true,
          },
        },
      },
    });

    return NextResponse.json(events, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve group events" },
      { status: 500 },
    );
  }
};
