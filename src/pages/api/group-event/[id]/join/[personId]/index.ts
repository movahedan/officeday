import { prisma } from "@/libs/data/prisma/client";
import { RSVPResponse } from "@/libs/data/schema";
import { createTranslator } from "@/libs/router/create-translator";
import { apiHandler } from "@/libs/utilities/api-handler";
import { dateFormatter } from "@/libs/utilities/date";

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
 *               - rsvps
 *             properties:
 *               rsvps:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/RSVP'
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
 *                 rsvps:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RSVP'
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
  const { rsvps } = req.body as PutApiGroupEventIdJoinPersonIdBody;

  const isValidRsvps =
    Array.isArray(rsvps) &&
    rsvps.length !== 0 &&
    rsvps.some((r) => Object.keys(RSVPResponse).includes(r.response));

  if (!isValidRsvps) {
    return res.status(400).json({
      error: t("invalid-option-statuses"),
    });
  }

  const rsvpList = rsvps.map((r) => ({
    date: new Date(r.date),
    response: r.response,
  }));

  return prisma.$transaction(async (tx) => {
    const { options } = await tx.groupEvent
      .findFirstOrThrow({ where: { id } })
      .catch(() => ({ options: [] }));

    const rsvpDates = rsvpList.map((r) => dateFormatter(r.date));
    const dates = options.map((o) => dateFormatter(o.date));
    const optionExist = dates.some((d1) => !!rsvpDates.find((d2) => d2 === d1));
    if (!optionExist) {
      return res.status(400).json({ error: t("option-not-found") });
    }

    return prisma.groupEvent
      .update({
        where: { id },
        data: {
          invitees: {
            updateMany: {
              where: { id: personId },
              data: { rsvps: rsvpList },
            },
          },
        },
      })
      .then(({ invitees }) => {
        return res.status(201).json(invitees.find((i) => i.id === personId));
      })
      .catch(() => {
        return res.status(400).json({ error: t("no-event-exist") });
      });
  });
}
