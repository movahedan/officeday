import { nanoid } from "nanoid";

import { prisma } from "@/libs/data/prisma/client";
import { createTranslator } from "@/libs/router/create-translator";
import { apiHandler } from "@/libs/utilities/api-handler";

import type { PostApiGroupEventBody } from "@/libs/data/schema";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/group-event:
 *   post:
 *     summary: Create a new group event
 *     description: Creates a new group event with provided owner and suggested options.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - owner
 *               - options
 *             properties:
 *               owner:
 *                 $ref: '#/components/schemas/PersonCreate'
 *               options:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Option'
 *     responses:
 *       201:
 *         description: Group event created successfully
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
  return apiHandler(req, res, { POST: () => handlePOST(req, res) });
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const t = await createTranslator(req, "apis.group-event.post");
  const { owner, options } = req.body as PostApiGroupEventBody;

  if (!owner?.name || !options?.length)
    return res.status(400).json({ error: t("name-and-options-required") });
  if (options.some((option) => new Date(option.date) < new Date()))
    return res.status(400).json({ error: t("date-cannot-be-in-the-past") });

  return prisma.groupEvent
    .create({
      data: {
        owner: {
          id: nanoid(10),
          name: owner.name,
        },
        options: options.map((option) => ({
          date: new Date(option.date),
        })),
      },
    })
    .then((groupEvent) => res.status(201).json(groupEvent));
}
