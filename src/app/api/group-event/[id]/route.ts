import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma/client";

import type { GroupEvent, GroupEventOptions } from "@/libs/prisma/types";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const id = decodeURIComponent(url.pathname.split("/")[3]);

  try {
    const groupEvent = await prisma.groupEvent.findUnique({
      where: { id },
      include: {
        owner: true,
        suggestedOptions: true,
        invitees: {
          include: {
            person: true,
          },
        },
      },
    });

    if (!groupEvent) {
      return NextResponse.json(
        { error: "No event with this ID exists." },
        { status: 404 },
      );
    }

    return NextResponse.json(groupEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve the event." },
      { status: 500 },
    );
  }
};

export const PUT = async (request: Request) => {
  const { id, suggestedOptions } = (await request.json()) as GroupEvent & {
    suggestedOptions: GroupEventOptions[];
  };

  if (!suggestedOptions.length) {
    return NextResponse.json(
      { error: "Please enter at least one option." },
      { status: 400 },
    );
  }

  if (suggestedOptions.some((option) => new Date(option.date) < new Date())) {
    return NextResponse.json(
      { error: "Date cannot be in the past." },
      { status: 400 },
    );
  }

  try {
    // Update the groupEvent's suggested options
    await prisma.groupEvent.update({
      where: { id },
      data: {
        suggestedOptions: {
          deleteMany: {}, // Delete all existing options
          createMany: {
            data: suggestedOptions.map((option) => ({
              date: new Date(option.date),
            })),
          },
        },
      },
    });

    // Fetch the updated group event to return it
    const updatedGroupEvent = await prisma.groupEvent.findUnique({
      where: { id },
      include: {
        suggestedOptions: true,
      },
    });

    return NextResponse.json(updatedGroupEvent, {
      status: 200,
      statusText: "Suggested options updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update the event." },
      { status: 500 },
    );
  }
};
