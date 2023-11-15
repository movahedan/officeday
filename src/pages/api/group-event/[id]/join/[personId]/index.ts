import { prisma } from "@/libs/data/prisma/client";
import { apiHandler } from "@/libs/utilities/api-handler";

import type { PutApiGroupEventIdJoinPersonIdBody } from "@/libs/data/schema";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/group-event/{id}/join/{personId}:
 *   put:
 *     summary: Update participation options for a person in a group event
 *     description: Updates the possible options for a person's participation in a specific group event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group event
 *       - in: path
 *         name: personId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the person (invitee)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - possibleOptions
 *             properties:
 *               possibleOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of possible option IDs that the person is interested in
 *     responses:
 *       201:
 *         description: Participation options updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - personId
 *                 - possibleOptionIds
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Identifier of the updated invitee
 *                 personId:
 *                   type: string
 *                   description: Identifier of the person (invitee)
 *                 possibleOptionIds:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Updated array of possible option IDs for the invitee
 *       400:
 *         description: Invalid input, object invalid or invitee not found
 *       500:
 *         description: Server error
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return apiHandler(req, res, { PUT: () => handlePUT(req, res) });
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  const { id, personId } = req.query as { id: string; personId: string };
  const { possibleOptions: possibleOptionsIds } =
    req.body as unknown as PutApiGroupEventIdJoinPersonIdBody;

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
}
