import { prisma } from "@/libs/data/prisma/client";
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
 *                 type: object
 *                 description: The person joining the event
 *                 required:
 *                   - name
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the person
 *     responses:
 *       201:
 *         description: Person joined the event successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Id of the person who joined
 *                 name:
 *                   type: string
 *                   description: Name of the person who joined
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
  const { id } = req.query as { id: string };
  const {
    person: { name },
  } = req.body as PostApiGroupEventIdJoinBody;

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
}
