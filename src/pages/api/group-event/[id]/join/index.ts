import { nanoid } from "nanoid";

import { prisma } from "@/libs/data/prisma/client";
import { createTranslator } from "@/libs/router/create-translator";
import { apiHandler } from "@/libs/utilities/api-handler";

import type { PostApiGroupEventIdJoinBody } from "@/libs/data/schema";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/group-event/{id}/join:
 *   post:
 *     summary: Join a group event
 *     description: Allows a person to join a group event using the event ID and person's name.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group event to join
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - person
 *             properties:
 *               person:
 *                 $ref: '#/components/schemas/PersonCreate'
 *     responses:
 *       201:
 *         description: Person joined the event successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return apiHandler(req, res, { POST: () => handlePOST(req, res) });
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const t = await createTranslator(req, "apis.group-event-id-join.post");

  const { id } = req.query as { id: string };
  const { person } = req.body as PostApiGroupEventIdJoinBody;
  const invitee = { id: nanoid(10), name: person.name, rsvps: [] };

  return prisma.$transaction(async (tx) => {
    const nameExist = await tx.groupEvent.findFirst({
      where: { id, invitees: { some: { name: invitee.name } } },
    });

    if (nameExist) {
      return res.status(400).json({ message: t("invitee-name-exist") });
    }

    return tx.groupEvent
      .update({
        where: { id },
        data: { invitees: { push: invitee } },
      })
      .then(({ invitees }) => {
        return res.status(201).json(invitees.find((i) => i.id === invitee.id));
      })
      .catch((e) => {
        return res.status(400).json({ message: e });
      });
  });
}
