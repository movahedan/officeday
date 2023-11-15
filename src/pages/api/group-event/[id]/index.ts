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
 *     description: Retrieves a group event based on the provided ID.
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
 *               type: object
 *               required:
 *                 - id
 *                 - ownerId
 *                 - owner
 *                 - suggestedOptions
 *                 - invitees
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier of the group event
 *                 ownerId:
 *                   type: string
 *                   description: Identifier of the owner of the group event
 *                 owner:
 *                   type: object
 *                   required:
 *                     - id
 *                     - name
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                       description: Name of the owner
 *                 suggestedOptions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - id
 *                       - date
 *                       - eventId
 *                       - invitees
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier of the group event option
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Suggested date for the event
 *                       eventId:
 *                         type: string
 *                         description: Identifier of the related group event
 *                       invitees:
 *                         type: array
 *                         items:
 *                           type: string
 *                 invitees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - id
 *                       - personId
 *                       - groupEventId
 *                       - possibleOptionIds
 *                       - person
 *                       - possibleOptions
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Identifier of the invitee
 *                       personId:
 *                         type: string
 *                         description: Identifier of the person invited
 *                       groupEventId:
 *                         type: string
 *                         description: Identifier of the related group event
 *                       possibleOptionIds:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Array of IDs for the possible options for this invitee
 *                       person:
 *                         type: object
 *                         required:
 *                           - id
 *                           - name
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                             description: Name of the invited person
 *                       possibleOptions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           required:
 *                             - id
 *                             - date
 *                             - eventId
 *                           properties:
 *                             id:
 *                               type: string
 *                             date:
 *                               type: string
 *                               format: date-time
 *                             eventId:
 *                               type: string
 *       400:
 *         description: Event ID is required
 *       404:
 *         description: No event with this ID exists
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a group event's suggested options
 *     description: Updates the suggested options for a group event based on the provided ID.
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
 *               ownerId:
 *                 type: string
 *                 description: Identifier of the owner of the group event
 *               owner:
 *                 type: object
 *                 required:
 *                   - id
 *                   - name
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                     description: Name of the owner
 *               suggestedOptions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - date
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier of the group event option
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: Suggested date for the event
 *                     eventId:
 *                       type: string
 *                       description: Identifier of the related group event
 *                     invitees:
 *                       type: array
 *                       items:
 *                         type: string
 *               invitees:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - personId
 *                     - groupEventId
 *                     - possibleOptionIds
 *                     - person
 *                     - possibleOptions
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Identifier of the invitee
 *                     personId:
 *                       type: string
 *                       description: Identifier of the person invited
 *                     groupEventId:
 *                       type: string
 *                       description: Identifier of the related group event
 *                     possibleOptionIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Array of IDs for the possible options for this invitee
 *                     person:
 *                       type: object
 *                       required:
 *                         - id
 *                         - name
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                           description: Name of the invited person
 *                     possibleOptions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - id
 *                           - date
 *                           - eventId
 *                         properties:
 *                           id:
 *                             type: string
 *                           date:
 *                             type: string
 *                             format: date-time
 *                           eventId:
 *                             type: string
 *     responses:
 *       200:
 *         description: Group event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - ownerId
 *                 - owner
 *                 - suggestedOptions
 *                 - invitees
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier of the group event
 *                 ownerId:
 *                   type: string
 *                   description: Identifier of the owner of the group event
 *                 owner:
 *                   type: object
 *                   required:
 *                     - id
 *                     - name
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                       description: Name of the owner
 *                 suggestedOptions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - id
 *                       - date
 *                       - eventId
 *                       - invitees
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier of the group event option
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Suggested date for the event
 *                       eventId:
 *                         type: string
 *                         description: Identifier of the related group event
 *                       invitees:
 *                         type: array
 *                         items:
 *                           type: string
 *                 invitees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - id
 *                       - personId
 *                       - groupEventId
 *                       - possibleOptionIds
 *                       - person
 *                       - possibleOptions
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Identifier of the invitee
 *                       personId:
 *                         type: string
 *                         description: Identifier of the person invited
 *                       groupEventId:
 *                         type: string
 *                         description: Identifier of the related group event
 *                       possibleOptionIds:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Array of IDs for the possible options for this invitee
 *                       person:
 *                         type: object
 *                         required:
 *                           - id
 *                           - name
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                             description: Name of the invited person
 *                       possibleOptions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           required:
 *                             - id
 *                             - date
 *                             - eventId
 *                           properties:
 *                             id:
 *                               type: string
 *                             date:
 *                               type: string
 *                               format: date-time
 *                             eventId:
 *                               type: string
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
    include: {
      owner: true,
      suggestedOptions: true,
      invitees: {
        include: {
          person: true,
        },
      },
    },
  });

  if (!groupEvent) {
    return res.status(404).json({ error: t("no-event-exist") });
  }

  const suggestedOptions = await prisma.groupEventOption.findMany({
    where: {
      eventId: id,
    },
  });

  const invitees = await Promise.all(
    groupEvent.invitees.map(async (invitee) => {
      const inviteeOptions = suggestedOptions.filter(
        (option) => invitee.possibleOptionIds?.some((id) => id === option.id),
      );

      return {
        ...invitee,
        possibleOptions: inviteeOptions,
      };
    }),
  );

  return res.status(200).json({ ...groupEvent, invitees });
}

async function handlePUT(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const t = await createTranslator(req, "apis.group-event-id.put");

  const { suggestedOptions } = req.body as PutApiGroupEventIdBody;

  if (!suggestedOptions?.length) {
    return res.status(400).json({ error: t("select-at-least-one-option") });
  }

  if (suggestedOptions.some((option) => new Date(option.date) < new Date())) {
    return res.status(400).json({ error: t("date-cannot-be-in-the-past") });
  }

  await prisma.groupEvent.update({
    where: { id },
    data: {
      suggestedOptions: {
        deleteMany: {}, // Delete all existing options
        createMany: {
          data: suggestedOptions.map((option) => ({
            date: new Date(option.date),
          })),
        },
      },
    },
  });

  const updatedGroupEvent = await prisma.groupEvent.findUnique({
    where: { id },
    include: { suggestedOptions: true },
  });

  return res.status(200).json(updatedGroupEvent);
}
