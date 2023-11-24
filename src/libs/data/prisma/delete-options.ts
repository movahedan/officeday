/* eslint-disable jsdoc/no-missing-syntax */
import { prisma } from "@/libs/data/prisma/client";

export const deleteOptions = async (eventId: string, ids: string[]) => {
  if (!ids.length) return;

  const optionStatuses = await prisma.groupEventOptionStatus.findMany({
    where: { optionId: { in: ids } },
    select: { optionId: true },
  });
  const statusIds = optionStatuses.map((status) => status.optionId);

  await prisma.groupEvent.update({
    where: { id: eventId },
    data: {
      suggestedOptions: {
        deleteMany: { eventId, id: { in: ids } },
      },
    },
  });
  await prisma.groupEventOption.deleteMany({
    where: { id: { in: ids } },
  });
  await prisma.groupEventInvitee.updateMany({
    where: { optionStatusIds: { hasSome: statusIds } },
    data: { optionStatusIds: [] },
  });
  await prisma.groupEventOptionStatus.deleteMany({
    where: {
      id: { in: statusIds },
    },
  });
};
