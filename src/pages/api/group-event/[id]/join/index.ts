import { prisma } from "@/libs/prisma/client";
import { errorHandlerApiRoute } from "@/libs/utilities/error-handlers";

import type { Person } from "@/libs/prisma/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      return handlePOST(req, res);
    default:
      res.setHeader("Allow", ["POST"]);

      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query as { id: string };
    const {
      person: { name },
    } = req.body as unknown as { person: Person };

    let person = await prisma.person.findUnique({
      where: { name },
    });

    if (!person) {
      person = await prisma.person.create({
        data: { name },
      });
    }

    const newInvitee = await prisma.groupEventInvitee.create({
      data: {
        personId: person.id,
        groupEventId: id,
      },
      include: { person: true },
    });

    return res.status(201).json(newInvitee.person);
  } catch (error) {
    errorHandlerApiRoute(error);

    return res
      .status(500)
      .json({ error: "An error occurred while creating the person." });
  }
}
