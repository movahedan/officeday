import { prisma } from "@/libs/prisma/client";

import type { EditGroupEventSuggestedOptions } from "@/libs/prisma/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  switch (req.method) {
    case "GET":
      return handleGET(req, res, id as string);
    case "PUT":
      return handlePUT(req, res, id as string);
    default:
      res.setHeader("Allow", ["GET", "PUT"]);

      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  try {
    const groupEvent = await prisma.groupEvent.findUnique({
      where: { id },
      include: {
        owner: true,
        suggestedOptions: true,
        invitees: {
          include: {
            person: true,
            possibleOptions: true,
          },
        },
      },
    });

    if (!groupEvent) {
      return res.status(404).json({ error: "No event with this ID exists." });
    }

    return res.status(200).json(groupEvent);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to retrieve the event." });
  }
}

async function handlePUT(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const { suggestedOptions } = req.body as EditGroupEventSuggestedOptions;

  if (!suggestedOptions?.length) {
    return res.status(400).json({ error: "Please enter at least one option." });
  }

  if (suggestedOptions.some((option) => new Date(option.date) < new Date())) {
    return res.status(400).json({ error: "Date cannot be in the past." });
  }

  try {
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

    const updatedGroupEvent = await prisma.groupEvent.findUnique({
      where: { id },
      include: {
        suggestedOptions: true,
      },
    });

    return res.status(200).json(updatedGroupEvent);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to update the event." });
  }
}
