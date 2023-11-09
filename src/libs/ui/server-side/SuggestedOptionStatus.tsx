import { dateFormatter } from "@/libs/utilities/date";

import { List } from "./List";

import type { GroupEventOption, Invitee } from "@/libs/prisma/types";

export type SuggestedOptionsStatusProps = {
  suggestedOptions: GroupEventOption[];
  invitees: Invitee[];
  className?: string;
};

export const SuggestedOptionsStatus = ({
  suggestedOptions,
  invitees,
  className,
}: SuggestedOptionsStatusProps) => (
  <List
    items={suggestedOptions}
    keys={(option) => option.id}
    className={className}
  >
    {(option) => <Item option={option} invitees={invitees} />}
  </List>
);

const Item = ({
  option,
  invitees,
}: {
  option: GroupEventOption;
  invitees: Invitee[];
}) => {
  const votedPeople = invitees
    .filter((invitee) =>
      invitee.possibleOptions.map((option) => option.id).includes(option.id),
    )
    .map((invitee) => invitee.person.name);

  return (
    <>
      <span className="mr-4">{dateFormatter(new Date(option.date))}:</span>
      <span>
        {votedPeople.length === 0 ? "Not possible" : votedPeople.join("-")}
      </span>
    </>
  );
};
