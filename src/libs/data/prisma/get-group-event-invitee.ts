/* eslint-disable jsdoc/no-missing-syntax */
import { prisma } from "@/libs/data/prisma/client";

export const getGroupEventInvitee = async (id: string) => {
  const invitee = await prisma.groupEventInvitee.findFirst({
    where: { id: id },
    include: { person: true },
  });

  if (!invitee) return undefined;

  const optionStatuses = await prisma.groupEventOptionStatus.findMany({
    where: { id: { in: invitee.optionStatusIds || [] } },
  });

  return { ...invitee, optionStatuses };
};
