import { prisma } from "@/libs/data/prisma/client";
import { getGroupEventInvitee } from "@/libs/data/prisma/get-group-event-invitee";
import { createTranslator } from "@/libs/router/create-translator";
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
 *               - optionStatuses
 *             properties:
 *               optionStatuses:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/GroupEventOptionStatusCreate'
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
 *                 - optionStatuses
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Identifier of the updated invitee
 *                 personId:
 *                   type: string
 *                   description: Identifier of the person (invitee)
 *                 optionStatuses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GroupEventOptionStatus'
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
  const t = await createTranslator(
    req,
    "apis.group-event-id-join-person-id.put",
  );

  const { id, personId } = req.query as { id: string; personId: string };
  const { optionStatuses } =
    req.body as unknown as PutApiGroupEventIdJoinPersonIdBody;

  const invalidOptionStatuses =
    !Array.isArray(optionStatuses) ||
    (Array.isArray(optionStatuses) && optionStatuses.length === 0) ||
    (Array.isArray(optionStatuses) &&
      optionStatuses.some(
        (optionStatus) =>
          !["Not voted", "Not possible", "Possible", "Reluctant"].includes(
            optionStatus.status,
          ),
      ));

  if (invalidOptionStatuses) {
    return res.status(400).json({
      message: t("invalid-option-statuses"),
    });
  }

  for (const optionStatus of optionStatuses) {
    const currentOptionStatus = await prisma.groupEventOptionStatus.findFirst({
      where: { optionId: optionStatus.optionId },
    });
    if (!currentOptionStatus) {
      return res.status(404).json({
        message: t("option-not-found"),
      });
    }

    await prisma.groupEventOptionStatus.update({
      where: { id: currentOptionStatus.id },
      data: {
        status: optionStatus.status,
      },
    });
  }

  const invitee = await prisma.groupEventInvitee.findFirst({
    where: {
      personId: personId,
      groupEventId: id,
    },
  });
  if (!invitee) {
    return res.status(404).json({
      message: t("invitee-not-found"),
    });
  }

  const updatedInvitee = await getGroupEventInvitee(invitee.id);
  if (!updatedInvitee) {
    return res.status(404).json({
      message: t("invitee-not-found"),
    });
  }

  return res.status(201).json(updatedInvitee);
}
