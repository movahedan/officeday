export type Person = {
  name: string;
};

export type Invitee = Person & {
  possibleOptions: string[]; // reference to option id
};

export type GroupEventOptions = {
  id: string;
  date: Date;
};

export type GroupEvent = {
  id: string;
  owner: Person;
  suggestedOptions: GroupEventOptions[];
  invitees: Invitee[];
};

export type NewGroupEvent = {
  owner: Person;
  suggestedOptions: Omit<GroupEventOptions, "id">[];
};

export type EditGroupEventSuggestedOptions = {
  id: string;
  suggestedOptions: Omit<GroupEventOptions, "id">[];
};
