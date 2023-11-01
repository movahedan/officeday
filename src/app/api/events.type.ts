export type Person = {
  name: string;
};

export type Invitee = Person & {
  possibleOptions: string[]; // reference to option id
};

export type OfficeDayEventOptions = {
  id: string;
  date: Date;
};

export type OfficeDayEvent = {
  id: string;
  owner: Person;
  suggestedOptions: OfficeDayEventOptions[];
  invitees: Invitee[];
};

export type NewOfficeDayEvent = {
  owner: Person;
  suggestedOptions: Omit<OfficeDayEventOptions, "id">[];
};

export type EditOfficeDayEventSuggestedOptions = {
  id: string;
  suggestedOptions: Omit<OfficeDayEventOptions, "id">[];
};
