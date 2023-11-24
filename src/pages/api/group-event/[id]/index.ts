import { prisma } from "@/libs/data/prisma/client";
import { createOptions } from "@/libs/data/prisma/create-options";
import { deleteOptions } from "@/libs/data/prisma/delete-options";
import { getGroupEvent } from "@/libs/data/prisma/get-group-event";
import { updateOptions } from "@/libs/data/prisma/update-options";
import { createTranslator } from "@/libs/router/create-translator";
import { apiHandler } from "@/libs/utilities/api-handler";
import { dateFormatter } from "@/libs/utilities/date";

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
 *               - suggestedOptions
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier of the group event
 *               suggestedOptions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/GroupEventOptionCreate'
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

  const groupEvent = await getGroupEvent(id);

  if (!groupEvent) {
    return res.status(404).json({ error: t("no-event-exist") });
  }

  return res.status(200).json(groupEvent);
}

async function handlePUT(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const t = await createTranslator(req, "apis.group-event-id.get");
  const { suggestedOptions } = req.body as PutApiGroupEventIdBody;

  const currentOptions = await prisma.groupEventOption.findMany({
    where: { eventId: id },
  });

  const optionsToAdd = suggestedOptions.filter(
    (so) => !currentOptions.some((co) => co.id === so.id),
  );
  const optionsToUpdate = suggestedOptions.filter((so) =>
    currentOptions.some(
      (co) => co.id === so.id && dateFormatter(new Date(co.date)) !== so.date,
    ),
  );
  const optionsToDeleteIds = currentOptions
    .filter((co) => !suggestedOptions.some((so) => so.id === co.id))
    .map((option) => option.id);

  await createOptions(id, optionsToAdd);
  await deleteOptions(id, optionsToDeleteIds);
  await updateOptions(id, optionsToUpdate);

  const groupEvent = await getGroupEvent(id);
  if (!groupEvent) {
    return res.status(404).json({ error: t("no-event-exist") });
  }

  return res.status(200).json(groupEvent);
}
