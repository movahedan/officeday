import { RSVPResponse } from "@/libs/data/schema";

import type { Invitee } from "@/libs/data/schema";

export const sortDateRsvpEntries = (
  entries: ReturnType<typeof getDateRsvpEntries>,
) =>
  entries.sort((first, second) => {
    const firstRsvp = first[1];
    const secondRsvp = second[1];

    const hasFewerNotPossible =
      (firstRsvp[RSVPResponse.NOT_POSSIBLE].length -
        secondRsvp[RSVPResponse.NOT_POSSIBLE].length) *
      1.2;

    const hasMorePossible =
      (secondRsvp[RSVPResponse.POSSIBLE].length -
        firstRsvp[RSVPResponse.POSSIBLE].length) *
      1.1;

    const hasMoreTentative =
      secondRsvp[RSVPResponse.TENTATIVE].length -
      firstRsvp[RSVPResponse.TENTATIVE].length;

    return hasFewerNotPossible + hasMoreTentative + hasMorePossible;
  });

export const getDateRsvpEntries = (
  dates: string[],
  invitees: Invitee[],
): [string, Record<RSVPResponse, string[]>][] =>
  dates.map((date) => [date, getRsvpNameEntries(invitees, date)]);

const responses = Object.keys(RSVPResponse) as unknown as RSVPResponse[];
const getRsvpNameEntries = (
  invitees: Invitee[],
  date: string,
): Record<RSVPResponse, string[]> =>
  Object.fromEntries(
    responses.map((response) => {
      const names = invitees
        .filter((invitee) => hasVote(invitee, date, response))
        .map((invitee) => invitee.name);

      return [response, names];
    }),
  ) as Record<RSVPResponse, string[]>;

const hasVote = (invitee: Invitee, date: string, response: RSVPResponse) => {
  return invitee.rsvps.some((rsvp) => {
    return rsvp.date === date && rsvp.response === response;
  });
};
