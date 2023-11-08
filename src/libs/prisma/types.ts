export type Person = {
  id: string;
  name: string;
};

export type Invitee = {
  id: string;
  person: Person;
  possibleOptions: GroupEventOption[]; // reference to option id
};

export type GroupEventOption = {
  id: string;
  date: Date;
};

export type GroupEvent = {
  id: string;
  owner: Person;
  suggestedOptions: GroupEventOption[];
  invitees: Invitee[];
};

export type NewGroupEvent = {
  owner: Omit<Person, "id">;
  suggestedOptions: Omit<GroupEventOption, "id">[];
};

export type EditGroupEventSuggestedOptions = {
  id: string;
  suggestedOptions: Omit<GroupEventOption, "id">[];
};

export type GroupEventSelectOptions = {
  id: string;
  possibleOptions: GroupEventOption["id"][];
};
