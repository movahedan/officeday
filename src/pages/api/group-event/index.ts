import { prisma } from "@/libs/data/prisma/client";
import { errorHandlerApiRoute } from "@/libs/utilities/error-handlers";

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
 *                 type: object
 *                 description: The owner of the event
 *                 required:
 *                   - name
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the event owner
 *               suggestedOptions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - date
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: Suggested date for the event
 *     responses:
 *       201:
 *         description: Group event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - ownerId
 *                 - owner
 *                 - suggestedOptions
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
 *                     - name
 *                   properties:
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
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier of the group event option
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Suggested date for the event
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      return handlePOST(req, res);
    default:
      res.setHeader("Allow", ["POST"]);

      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { owner, suggestedOptions } = req.body as PostApiGroupEventBody;

  if (!owner?.name || !suggestedOptions?.length) {
    return res
      .status(400)
      .json({ error: "Owner name and options are required" });
  }

  if (suggestedOptions.some((option) => new Date(option.date) < new Date())) {
    return res.status(400).json({ error: "Date cannot be in the past" });
  }

  try {
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
  } catch (error) {
    errorHandlerApiRoute(error);

    return res.status(500).json({ error: "Failed to create group event" });
  }
}
