import { prisma } from "@/libs/data/prisma/client";
import { createTranslator } from "@/libs/router/create-translator";
import { apiHandler } from "@/libs/utilities/api-handler";

import type { PutApiGroupEventIdBody } from "@/libs/data/schema";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/group-event/{id}:
 *   get:
 *     summary: Get a specific group event
 *     description: Retrieves a group event based on the provided ID including the status of options for each invitee.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group event
 *     responses:
 *       200:
 *         description: Group event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupEvent'
 *       400:
 *         description: Event ID is required
 *       404:
 *         description: No event with this ID exists
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a group event's details
 *     description: Updates the details for a group event based on the provided ID, including updating the status of options for each invitee.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - options
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier of the group event
 *               options:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Option'
 *     responses:
 *       200:
 *         description: Group event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupEvent'
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  return apiHandler(req, res, {
    GET: () => handleGET(req, res, id as string),
    PUT: () => handlePUT(req, res, id as string),
  });
}

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const t = await createTranslator(req, "apis.group-event-id.get");

  const groupEvent = await prisma.groupEvent.findUnique({
    where: { id },
  });

  if (!groupEvent) return res.status(404).json({ error: t("no-event-exist") });

  return res.status(200).json(groupEvent);
}

async function handlePUT(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const t = await createTranslator(req, "apis.group-event-id.get");
  const { options } = req.body as PutApiGroupEventIdBody;

  return prisma.groupEvent
    .update({
      where: { id },
      data: { options: options.map(({ date }) => ({ date: new Date(date) })) },
    })
    .then((groupEvent) => res.status(200).json(groupEvent))
    .catch(() => res.status(404).json({ error: t("no-event-exist") }));
}
