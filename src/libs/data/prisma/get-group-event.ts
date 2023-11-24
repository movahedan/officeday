/* eslint-disable jsdoc/no-missing-syntax */
import { prisma } from "@/libs/data/prisma/client";

import { getGroupEventInvitee } from "./get-group-event-invitee";

export const getGroupEvent = async (id: string) => {
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
    return undefined;
  }

  const invitees = await Promise.all(
    groupEvent.invitees
      .map((i) => i.id)
      .map(async (id) => await getGroupEventInvitee(id)),
  );

  return { ...groupEvent, invitees };
};
