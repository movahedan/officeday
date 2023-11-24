import { prisma } from "./client";
import { Status } from "../schema";

import type { GroupEventOptionCreate } from "../schema";

export const updateOptions = async (
  eventId: string,
  optionsToUpdate: GroupEventOptionCreate[],
) => {
  if (!optionsToUpdate.length) return;

  const invitees = await prisma.groupEventInvitee.findMany({
    where: { groupEventId: eventId },
    select: { id: true },
  });

  for (const option of optionsToUpdate) {
    await prisma.groupEventOption.update({
      where: { id: option.id },
      data: { date: new Date(option.date), optionStatusIds: [] },
    });

    for (const invitee of invitees) {
      await prisma.groupEventOptionStatus.updateMany({
        where: { optionId: option.id, inviteeId: invitee.id },
        data: { status: Status.Not_voted },
      });
    }
  }
};
