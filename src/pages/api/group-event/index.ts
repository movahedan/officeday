import { prisma } from "@/libs/prisma/client";
import { errorHandlerApiRoute } from "@/libs/utilities/error-handlers";

import type { NewGroupEvent } from "@/libs/prisma/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      return handlePOST(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);

      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { owner, suggestedOptions } = req.body as NewGroupEvent;

  if (!owner?.name || !suggestedOptions?.length) {
    return res
      .status(400)
      .json({ error: "Owner name and options are required" });
  }

  if (suggestedOptions.some((option) => new Date(option.date) < new Date())) {
    return res.status(400).json({ error: "Date cannot be in the past" });
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

    return res.status(201).json(groupEvent);
  } catch (error) {
    errorHandlerApiRoute(error);

    return res.status(500).json({ error: "Failed to create group event" });
  }
}
