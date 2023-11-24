import { prisma } from "./client";

import type { GroupEventOptionCreate } from "../schema";

export const createOptions = async (
  eventId: string,
  newOptions: GroupEventOptionCreate[],
) => {
  if (!newOptions.length) return;

  const invitees = await prisma.groupEventInvitee.findMany({
    where: { groupEventId: eventId },
    select: { id: true },
  });

  await prisma.groupEventOption.createMany({
    data: newOptions.map((option) => ({
      eventId: eventId,
      date: new Date(option.date),
    })),
  });

  const options = await prisma.groupEventOption.findMany({
    where: { eventId: eventId },
  });

  for (const option of options) {
    await prisma.groupEventOptionStatus.createMany({
      data: invitees.map((invitee) => ({
        optionId: option.id,
        inviteeId: invitee.id,
        status: "Not voted",
      })),
    });
  }
};
