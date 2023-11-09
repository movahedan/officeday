import { prisma } from "@/libs/prisma/client";
import { errorHandlerApiRoute } from "@/libs/utilities/error-handlers";

import type { GroupEventSelectOptions } from "@/libs/prisma/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "PUT":
      return handlePUT(req, res);
    default:
      res.setHeader("Allow", ["PUT"]);

      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, personId } = req.query as { id: string; personId: string };
    const { possibleOptions: possibleOptionsIds } =
      req.body as unknown as GroupEventSelectOptions;

    if (!Array.isArray(possibleOptionsIds)) {
      return res
        .status(400)
        .json({ message: "Invalid possibleOptionsIds, must be an array" });
    }

    if (possibleOptionsIds.length === 0) {
      return res.status(400).json({
        message:
          "Invalid possibleOptionsIds, it should contain at least one option",
      });
    }

    const invitee = await prisma.groupEventInvitee.findFirst({
      where: {
        personId: personId,
        groupEventId: id,
      },
    });

    if (!invitee) {
      return res.status(400).json({ message: "Invitee not found" });
    }

    const updatedInvitee = await prisma.groupEventInvitee.update({
      where: { id: invitee.id },
      data: {
        possibleOptionIds: { set: possibleOptionsIds.map((id) => id) },
      },
    });

    return res.status(201).json(updatedInvitee);
  } catch (error) {
    errorHandlerApiRoute(error);

    return res
      .status(500)
      .json({ error: "An error occurred while creating the person." });
  }
}