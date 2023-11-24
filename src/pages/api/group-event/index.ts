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
 *               - suggestedOptions
 *             properties:
 *               owner:
 *                 $ref: '#/components/schemas/PersonCreate'
 *               suggestedOptions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/GroupEventOptionCreate'
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

  const { owner, suggestedOptions } = req.body as PostApiGroupEventBody;
  if (!owner?.name || !suggestedOptions?.length) {
    return res.status(400).json({ error: t("name-and-options-required") });
  }

  if (suggestedOptions.some((option) => new Date(option.date) < new Date())) {
    return res.status(400).json({ error: t("date-cannot-be-in-the-past") });
  }

  const groupEvent = await prisma.groupEvent.create({
    data: {
      owner: {
        connectOrCreate: {
          where: { name: owner.name },
          create: { name: owner.name },
        },
      },
      suggestedOptions: {
        createMany: {
          data: suggestedOptions.map((option) => ({
            date: new Date(option.date),
          })),
        },
      },
    },
  });

  return res.status(201).json(groupEvent);
}
