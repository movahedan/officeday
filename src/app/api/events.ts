import { getRandomId } from "@/libs/utilities/random";

import type { OfficeDayEvent, NewOfficeDayEvent, Invitee } from "./events.type";

const officeDayEvents: OfficeDayEvent[] = [];

export const addOfficeDayEvent = ({
  owner,
  suggestedOptions,
}: NewOfficeDayEvent) => {
  const event: OfficeDayEvent = {
    id: getRandomId(),
    owner,
    suggestedOptions: suggestedOptions.map((option) => ({
      id: getRandomId(),
      ...option,
    })),
    invitees: [],
  };

  officeDayEvents.push(event);

  return event;
};

export const editOfficeDayEventSuggestedOptions = ({
  id,
  suggestedOptions,
}: Pick<OfficeDayEvent, "id" | "suggestedOptions">) => {
  const eventIndex = getOfficeDayEvents().findIndex((event) => event.id === id);
  officeDayEvents[eventIndex].suggestedOptions = suggestedOptions.map(
    (option) => ({ id: getRandomId(), date: option.date }),
  );
  officeDayEvents[eventIndex].invitees = officeDayEvents[
    eventIndex
  ].invitees.map((invitee) => ({ ...invitee, possibleOptions: [] }));

  return officeDayEvents[eventIndex];
};

export const addInvitee = ({
  id,
  invitee,
}: {
  id: string;
  invitee: Invitee;
}) => {
  const eventIndex = getOfficeDayEvents().findIndex((event) => event.id === id);
  officeDayEvents[eventIndex].invitees =
    officeDayEvents[eventIndex].invitees.concat(invitee);
};

export const editInviteePossibleOption = ({
  id,
  invitee,
}: {
  id: string;
  invitee: Invitee;
}) => {
  const eventIndex = getOfficeDayEvents().findIndex((event) => event.id === id);

  if (eventIndex === -1) throw Error("There was no event with given ID");

  const inviteeIndex = officeDayEvents[eventIndex].invitees.findIndex(
    (person) => person.name == invitee.name,
  );

  if (inviteeIndex === -1) throw Error("There was no invitee with given ID");

  officeDayEvents[eventIndex].invitees[inviteeIndex] = invitee;

  return officeDayEvents[eventIndex].invitees[inviteeIndex];
};

export const getOfficeDayEvent = (id: string) =>
  officeDayEvents.find((event) => event.id === id);

export const getOfficeDayEvents = () => officeDayEvents;
